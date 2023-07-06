import { ServerSchema as ServerSchemaMongoose } from "@harmony/nest-schemas";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FILE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FileType,
  FormatZodResponse,
  IdType,
  ServerIconSchema,
  ServerIconType,
  ServerSchema,
  ServerType,
  UserContextType,
} from "@harmony/zod";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ServerIconService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly clientFile: ClientProxy
  ) {}

  public async getIcon({
    id,
    object = false,
  }: {
    id: IdType;
    object: boolean;
  }): Promise<FileType | string> {
    try {
      const iconObject = (await this.serviceRequest.send({
        client: this.clientFile,
        pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
        data: { id },
        promise: true,
      })) as FileType;

      return object ? iconObject : iconObject.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async icon(payload: ServerIconType, user: UserContextType) {
    const parsed = ServerIconSchema.safeParse(payload);

    if (parsed.success === false) {
      throw new RpcException(
        new UnprocessableEntityException(FormatZodResponse(parsed.error.issues))
      );
    }

    const server = (await this.serverModel.findById(
      payload.serverId
    )) as ServerType;

    if (!server) {
      throw new RpcException(
        new UnprocessableEntityException("Server not found")
      );
    }

    payload.file.originalname = `${server.id}.${payload.file.originalname
      .split(".")
      .pop()}`;

    try {
      if (user.avatar) {
        await this.serviceRequest.send({
          client: this.clientFile,
          pattern: FILE_MESSAGE_PATTERN.DELETE,
          data: { id: server.icon },
        });
      }
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error deleting server icon")
      );
    }

    try {
      const file = await this.serviceRequest.send({
        client: this.clientFile,
        pattern: FILE_MESSAGE_PATTERN.CREATE,
        data: {
          file: payload.file,
          server: server.id,
        },
        promise: true,
      });

      const serverUpdated = (await this.serverModel.findByIdAndUpdate(
        server.id,
        {
          icon: file.id,
        },
        { new: true }
      )) as ServerType;

      const icon = await this.getIcon({ id: file.id, object: false });

      return {
        id: serverUpdated.id,
        name: serverUpdated.name,
        owner: serverUpdated.owner,
        members: serverUpdated.members,
        channels: serverUpdated.channels,
        roles: serverUpdated.roles,
        banned: serverUpdated.banned,
        icon,
        private: serverUpdated.private,
      };
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error changing avatar")
      );
    }
  }
}
