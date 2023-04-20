import { ServerService } from "./server.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { serverSchema } from "@harmony/zod";

@Controller("server")
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  async createServer(@Body(serverSchema) createServerDto: typeof serverSchema) {
    const server = await this.serverService.createServer(createServerDto);
    return server.toObject();
  }

  @Put(":id")
  async updateServer(
    @Param("id") serverId: string,
    @Body(serverSchema) updateServerDto: typeof serverSchema
  ) {
    const server = await this.serverService.updateServer(
      serverId,
      updateServerDto
    );
    return server.toObject();
  }

  @Delete(":id")
  async deleteServer(@Param("id") serverId: string) {
    const server = await this.serverService.deleteServer(serverId);
    return server.toObject();
  }

  @Post(":id/members")
  async addMemberToServer(
    @Param("id") serverId: string,
    @Body() addMemberDto: { userId: string }
  ) {
    const server = await this.serverService.addMemberToServer(
      serverId,
      addMemberDto.userId
    );
    return server.toObject();
  }

  @Delete(":id/members/:userId")
  async removeMemberFromServer(
    @Param("id") serverId: string,
    @Param("userId") userId: string
  ) {
    const server = await this.serverService.removeMemberFromServer(
      serverId,
      userId
    );
    return server.toObject();
  }
}
