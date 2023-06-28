import { SERVER_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
  UseInterceptors,
} from "@nestjs/common";
import { ServerService } from "./server.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import {
  ServerMemberAddType,
  ServerCreateType,
  ServerSchema,
  ServerMemberRemoveType,
  ServerRemoveType,
  UserContextType,
} from "@harmony/zod";
import { Errors } from "@harmony/enums";
import { IdType } from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";
import { ServerCreateService } from "./server-create.service";
import { MemberInterceptor } from "./member.interceptor";

@Controller("server")
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly serverCreateService: ServerCreateService
  ) {}

  @MessagePattern(SERVER_MESSAGE_PATTERN.CREATE)
  async createServer(
    @Payload()
    payload: {
      server: ServerCreateType;
    },
    @UserContext() user: UserContextType
  ) {
    return await this.serverCreateService.create(payload, user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_ALL)
  @UseInterceptors(MemberInterceptor)
  async getAllServers() {
    return await this.serverService.findAll();
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_BY_ID)
  @UseInterceptors(MemberInterceptor)
  async getServerById(id: string) {
    try {
      const server = await this.serverService.findOne(id);

      if (!server) {
        throw new RpcException(
          new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
        );
      }

      // const result = ServerSchema.safeParse(server);

      // if (result.success === false) {
      //   console.log(result.error.issues);
      //   throw new RpcException(
      //     new InternalServerErrorException(Errors.ERROR_INTERNAL_SERVER_ERROR)
      //   );
      // }

      return server;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // @MessagePattern(SERVER_MESSAGE_PATTERN.ADD_MEMBER)
  // async addMemberToServer(addMemberData: ServerMemberAddType) {
  //   return await this.serverService.addMember(
  //     addMemberData.serverId,
  //     addMemberData.memberId
  //   );
  // }

  @MessagePattern(SERVER_MESSAGE_PATTERN.REMOVE_MEMBER)
  async removeMemberToServer(removeMemberData: ServerMemberRemoveType) {
    return await this.serverService.removeMember(
      removeMemberData.serverId,
      removeMemberData.memberId
    );
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.DELETE)
  async deleteServer(removeServerData: ServerRemoveType) {
    return await this.serverService.removeServer(
      removeServerData.serverId,
      removeServerData.user
    );
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
}
