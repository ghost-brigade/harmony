import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FileType,
  IdType,
  UserContextType,
  UserPublicSchema,
  UserPublicType,
} from "@harmony/zod";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// tslint:disable-next-line: no-unused-variable
import { Multer } from "multer";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  FILE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectModel("User") private readonly userModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly clientFile: ClientProxy
  ) {}

  public async getAvatar({
    id,
    object = false,
  }: {
    id: IdType;
    object: boolean;
  }): Promise<FileType | string> {
    try {
      const avatarObject = (await this.serviceRequest.send({
        client: this.clientFile,
        pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
        data: { id },
        promise: true,
      })) as FileType;

      return object ? avatarObject : avatarObject.url;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting avatar")
      );
    }
  }

  async changeAvatar(
    payload: {
      file: Express.Multer.File;
    },
    user: UserContextType
  ) {
    payload.file.originalname = `${user.id}.${payload.file.originalname
      .split(".")
      .pop()}`;

    try {
      if (user.avatar) {
        await this.serviceRequest.send({
          client: this.clientFile,
          pattern: FILE_MESSAGE_PATTERN.DELETE,
          data: { id: user.avatar },
        });
      }
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error deleting avatar")
      );
    }

    try {
      const file = await this.serviceRequest.send({
        client: this.clientFile,
        pattern: FILE_MESSAGE_PATTERN.CREATE,
        data: {
          file: payload.file,
          user: user.id,
        },
        promise: true,
      });

      const userUpdated = await this.userModel.findByIdAndUpdate(
        user.id,
        {
          avatar: file.id,
        },
        { new: true }
      );

      const avatar = await this.getAvatar({ id: file.id, object: false });

      return UserPublicSchema.parse({
        ...userUpdated.toObject(),
        avatar,
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error changing avatar")
      );
    }
  }
}
