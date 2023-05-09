import { Controller } from "@nestjs/common";
import { ServerService } from "./server.service";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { createServerType } from "@harmony/zod";

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
      return server;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
