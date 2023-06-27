import { SERVER_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
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

@Controller("server")
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern(SERVER_MESSAGE_PATTERN.CREATE)
  // async createServer(data: ServerCreateType) {
  async createServer(data) {
    return await this.serverService.create(data.server, data.user);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_ALL)
  async getAllServers() {
    return await this.serverService.findAll();
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_BY_ID)
  async getServerById(id: string) {
    try {
      const server = await this.serverService.findOne(id);

      if (!server) {
        throw new RpcException(
          new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
        );
      }

      const result = ServerSchema.safeParse(server);

      if (!result.success) {
        throw new RpcException(
          new InternalServerErrorException(Errors.ERROR_INTERNAL_SERVER_ERROR)
        );
      }

      return result.data;
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
    console.log(user.id);
    return await this.serverService.addMember(payload, user.id);
  }
}
