import { ServiceRequest } from "@harmony/nest-microservice";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  FormatZodResponse,
  ServerCreateSchema,
  ServerCreateType,
  ServerType,
  UserContextType,
} from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ChannelService } from "../channel/channel.service";
import { ChannelType as ChannelTypeEnum, Permissions } from "@harmony/enums";

@Injectable()
export class ServerCreateService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly roleService: ClientProxy,
    private readonly serviceRequest: ServiceRequest,
    private readonly channelService: ChannelService
  ) {}

  private async createServer(
    server: { name?: string },
    user: UserContextType
  ): Promise<ServerType> {
    try {
      const newServer = await this.serverModel({
        name: server.name,
        owner: user.id,
      });

      return await newServer.save();
    } catch (error) {
      console.error(error);
      throw new RpcException(
        new InternalServerErrorException("Server creation failed")
      );
    }
  }

  async create(
    payload: { server: ServerCreateType },
    user: UserContextType
  ): Promise<ServerType> {
    try {
      const result = ServerCreateSchema.safeParse(payload.server);

      if (result.success === false) {
        throw new RpcException(
          new UnprocessableEntityException(
            FormatZodResponse(result.error.issues)
          )
        );
      }

      const server = await this.createServer(payload.server, user);

      await this.channelService.create(
        {
          channel: {
            name: "general",
            server: server.id,
            order: 1,
            type: ChannelTypeEnum.TEXT,
          },
        },
        user,
        false
      );

      const roleAdmin = await this.serviceRequest.send({
        client: this.roleService,
        pattern: ROLE_MESSAGE_PATTERN.CREATE,
        data: {
          role: {
            server: server.id,
            name: "@admin",
            permissions: [Permissions.SERVER_ADMIN],
          },
          authorization: false,
        },
        promise: true,
      });

      await this.serviceRequest.send({
        client: this.roleService,
        pattern: ROLE_MESSAGE_PATTERN.ADD_USER,
        data: {
          id: roleAdmin.id,
          userId: user.id,
          authorization: false,
        },
        promise: true,
      });

      const roleDefault = await this.serviceRequest.send({
        client: this.roleService,
        pattern: ROLE_MESSAGE_PATTERN.CREATE,
        data: {
          role: {
            server: server.id,
            name: "@default",
            permissions: [
              Permissions.CHANNEL_VIEW,
              Permissions.MESSAGE_CREATE,
              Permissions.MESSAGE_FILE_UPLOAD,
            ],
          },
          authorization: false,
        },
        promise: true,
      });

      server.roles = [roleAdmin.id, roleDefault.id];

      return server;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Server creation failed")
      );
    }
  }
}
