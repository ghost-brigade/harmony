import { ServiceRequest } from "@harmony/nest-microservice";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { IdSchema, IdType, UserContextType } from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  FILE_MESSAGE_PATTERN,
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ChannelService } from "../channel/channel.service";
import { Errors } from "@harmony/enums";
import { ServerService } from "./server.service";

@Injectable()
export class ServerDeleteService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly roleClient: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly fileClient: ClientProxy,
    private readonly serviceRequest: ServiceRequest,
    private readonly channelService: ChannelService,
    private readonly serverService: ServerService
  ) {}

  async remove(
    payload: {
      serverId: IdType;
    },
    user: UserContextType
  ): Promise<boolean> {
    const parsed = IdSchema.safeParse(payload.serverId);

    if (parsed.success === false) {
      throw new RpcException(
        new UnprocessableEntityException("Invalid server id")
      );
    }

    const server = await this.serverService.findOne(payload.serverId);

    if (!server) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
      );
    }

    if (server.owner !== user.id) {
      throw new RpcException(
        new UnauthorizedException(Errors.ERROR_ONLY_SERVER_OWNER_CAN_REMOVE)
      );
    }

    // remove all roles
    try {
      await this.serviceRequest.send({
        client: this.roleClient,
        pattern: ROLE_MESSAGE_PATTERN.DELETE_ALL_BY_SERVER_ID,
        data: {
          serverId: payload.serverId,
        },
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Failed to delete roles")
      );
    }

    // remove all channels and messages
    try {
      await this.channelService.deleteByServerId(
        {
          serverId: payload.serverId,
        },
        user,
        false
      );
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Failed to delete channels")
      );
    }

    // remove cover
    if (server.cover) {
      try {
        await this.serviceRequest.send({
          client: this.fileClient,
          pattern: FILE_MESSAGE_PATTERN.DELETE,
          data: {
            id: server.cover,
          },
        });
      } catch (error) {
        throw new RpcException(
          new InternalServerErrorException("Failed to delete cover")
        );
      }
    }

    const deletedServer = await this.serverModel
      .findByIdAndDelete(payload.serverId)
      .exec();

    return deletedServer;
  }
}
