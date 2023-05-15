import { SERVER_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  Controller,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ServerService } from "./server.service";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import {
  ServerMemberAddType,
  ServerCreateType,
  ServerSchema,
} from "@harmony/zod";

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern(SERVER_MESSAGE_PATTERN.CREATE)
  async createServer(data: ServerCreateType) {
    return await this.serverService.create(data);
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.GET_BY_ID)
  async getServerById(id: string) {
    try {
      const server = await this.serverService.findOne(id);

      if (!server) {
        throw new RpcException(
          new UnprocessableEntityException("Server not found")
        );
      }

      const result = ServerSchema.safeParse(server);

      if (!result.success) {
        throw new RpcException(
          new InternalServerErrorException("Internal server error")
        );
      }

      return result.data;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern(SERVER_MESSAGE_PATTERN.ADD_MEMBER)
  async addMemberToServer(addMemberData: ServerMemberAddType) {
    return await this.serverService.addMember(
      addMemberData.serverId,
      addMemberData.memberId
    );
  }
}
