import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Storage } from "@google-cloud/storage";
import { Folders } from "@harmony/enums";
import {
  FileCreateType,
  UserContextType,
  FileCreateSchema,
  FormatZodResponse,
  FileType,
  IdSchema,
  FileSchema,
  FilesSchema,
} from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class FileService {
  constructor(@InjectModel("File") private readonly fileModel) {}

  private bucketName = process.env.STORAGE_MEDIA_BUCKET;

  private getDestinationFolder = (file: FileCreateType) => {
    if (file.message) return Folders.MESSAGE;
    if (file.privateMessage) return Folders.DM;
    if (file.server) return Folders.SERVER;
    if (file.user) return Folders.USER;

    throw new Error("Invalid file type");
  };

  private storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  private async getSignedUrl(file: FileType): Promise<string | null> {
    const url = await this.storage
      .bucket(this.bucketName)
      .file(`${this.getDestinationFolder(file)}/${file.id}/${file.filename}`)
      .getSignedUrl({
        action: "read",
        expires: Date.now() + 24 * 60 * 60 * 1000,
      });

    return url[0] ?? null;
  }

  public async findAll(): Promise<FileType[]> {
    try {
      const files = await this.fileModel.find();
      const urls = await Promise.all(
        files.map(async (file: FileType) => {
          const url = await this.getSignedUrl(file);
          return Object.assign(file, { url });
        })
      );

      return FilesSchema.parse(urls);
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error finding files")
      );
    }
  }

  public async findById(payload: { id: string }): Promise<FileType> {
    const parsed = IdSchema.safeParse(payload.id);

    if (parsed.success === false) {
      throw new BadRequestException(FormatZodResponse(parsed.error.issues));
    }

    let file: FileType;

    try {
      file = await this.fileModel.findOne({ _id: payload.id });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error finding file")
      );
    }

    if (!file) {
      throw new RpcException(new BadRequestException("File not found"));
    }

    try {
      const url = await this.getSignedUrl(file);
      return FileSchema.parse(Object.assign(file, { url }));
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error while getting signed url")
      );
    }
  }

  public async create(
    payload: { file: Express.Multer.File } & FileCreateType,
    user: UserContextType
  ): Promise<FileType> {
    const parsed = FileCreateSchema.safeParse(payload);

    if (parsed.success === false) {
      throw new BadRequestException(FormatZodResponse(parsed.error.issues));
    }

    //todo use alexis lib to minimize file

    const filename = payload.file.originalname
      .toLowerCase()
      .split(".")
      .shift()
      .replace(/ /g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

    const extension = payload.file.originalname.split(".").pop();

    try {
      const fileObject = {
        owner: user.id,
        originalName: payload.file.originalname,
        mimeType: payload.file.mimetype,
        filename: `${filename}.${extension}`,
      };

      if (payload.message) fileObject["message"] = payload.message;
      if (payload.privateMessage)
        fileObject["privateMessage"] = payload.privateMessage;
      if (payload.server) fileObject["server"] = payload.server;
      if (payload.user) fileObject["user"] = payload.user;

      const newFile = new this.fileModel(fileObject);

      await this.storage
        .bucket(this.bucketName)
        .file(
          `${this.getDestinationFolder(payload)}/${
            newFile._id
          }/${filename}.${extension}`
        )
        .save(Buffer.from(payload.file.buffer));

      return await newFile.save();
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error creating file")
      );
    }
  }

  public async delete(
    payload: { id: string },
    user: UserContextType
  ): Promise<boolean> {
    try {
      const file = await this.fileModel.findOne({ _id: payload.id });

      if (!file) {
        throw new RpcException(new BadRequestException("File does not exist"));
      }

      await this.fileModel.deleteOne({
        _id: payload.id,
      });

      await this.storage
        .bucket(this.bucketName)
        .file(`${this.getDestinationFolder(file)}/${file.id}/${file.filename}`)
        .delete();

      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error deleting file")
      );
    }
  }
}
