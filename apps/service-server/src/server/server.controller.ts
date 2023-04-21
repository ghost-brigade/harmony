import { Controller, Get } from "@nestjs/common";

import { ServerService } from "./server.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern("server.create")
  async createServer() {
    try {
      return await this.serverService.createServer();
    } catch (error) {
      console.log(error);
    }
  }
}
