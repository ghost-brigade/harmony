import { Controller, InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import { ServerService } from "./server.service";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { addMemberType, createServerType, serverSchema } from "@harmony/zod";

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern("server.create")
  async createServer(createServerType: createServerType) {
    try {
      const server = await this.serverService.create(createServerType);
      return server;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern("server.getServerById")
  async getServerById(id: string) {
    try {
      const server = await this.serverService.getServerById(id);

      if (!server) {
        throw new RpcException(
          new UnprocessableEntityException("Server not found")
        );
      }

      const result = serverSchema.safeParse(server);

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

  @MessagePattern("server.addMember")
  async addMemberToServer(addMemberData: addMemberType) {
    try {
      console.log(addMemberData);
      const server = await this.serverService.addMember(
        addMemberData.serverId,
        addMemberData.memberId
      );
      return server;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
