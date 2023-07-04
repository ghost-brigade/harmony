import { ServerIconService } from "./server-icon.service";
import { SERVER_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller, NotFoundException, UseInterceptors } from "@nestjs/common";
import { ServerService } from "./server.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import {
  ServerCreateType,
  ServerMemberRemoveType,
  UserContextType,
  ServerUpdateType,
} from "@harmony/zod";
import { Errors } from "@harmony/enums";
import { IdType } from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";
import { ServerCreateService } from "./server-create.service";
import { GlobalServerInterceptor } from "./interceptors/global-server.interceptor";
import { ServerDeleteService } from "./server-delete.service";
import { ServerUpdateService } from "./server-update.service";
import { GlobalAllServerInterceptor } from "./interceptors/global-all-server.interceptor";

@Controller("server")
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly serverCreateService: ServerCreateService,
    private readonly serverDeleteService: ServerDeleteService,
    private readonly serverUpdateService: ServerUpdateService,
    private readonly ServerIconService: ServerIconService
  ) {}

  @MessagePattern(SERVER_MESSAGE_PATTERN.CREATE)
  async create(
    @Payload()
    payload: {
      server: ServerCreateType;
    },
    @UserContext() user: UserContextType
  ) {
    return await this.serverCreateService.create(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.UPLOAD_ICON)
  async uploadIcon(
    @Payload()
    payload: {
      serverId: IdType;
      icon: any;
    },
    @UserContext() user: UserContextType
  ) {
    return await this.ServerIconService.icon(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_ALL)
  @UseInterceptors(GlobalAllServerInterceptor)
  async getAllServers(@UserContext() user: UserContextType) {
    return await this.serverService.findAll(user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_BY_ID)
  @UseInterceptors(GlobalServerInterceptor)
  async getServerById(
    @Payload()
    payload: {
      serverId: IdType;
    }
  ) {
    try {
      const server = await this.serverService.findOne(payload.serverId);

      if (!server) {
        throw new RpcException(
          new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
        );
      }

      return server;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.REMOVE_MEMBER)
  async removeMemberToServer(removeMemberData: ServerMemberRemoveType) {
    return await this.serverService.removeMember(
      removeMemberData.serverId,
      removeMemberData.memberId
    );
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.UPDATE)
  async update(
    @Payload()
    payload: {
      serverId: IdType;
      server: ServerUpdateType;
    },
    @UserContext() user: UserContextType
  ) {
    return await this.serverUpdateService.update(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.DELETE)
  async remove(
    @Payload() payload: { serverId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.serverDeleteService.remove(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_MEMBERS_OF_SERVER)
  async getMembersOfServer(serverId: IdType) {
    return await this.serverService.getMembersOfServer(serverId);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_SERVERS_OF_MEMBER)
  async getServersOfMember(memberId: IdType) {
    return await this.serverService.getServersOfMember(memberId);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.JOIN_SERVER)
  async joinServer(
    @Payload() payload: { serverId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.serverService.addMember(payload, user.id);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.LEAVE_SERVER)
  async leaveServer(
    @Payload() payload: { serverId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.serverService.leaveServer(payload, user.id);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.BAN_MEMBER)
  async banMemberFromServer(
    @Payload() payload: { serverId: IdType; memberId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.serverService.banMember(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.UNBAN_MEMBER)
  async unbanMemberFromServer(
    @Payload() payload: { serverId: IdType; memberId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.serverService.unbanMember(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.SEARCH)
  async search(
    @Payload() payload: { search: { name: string } },
    @UserContext() user: UserContextType
  ) {
    return await this.serverService.search(payload, user);
  }
}
