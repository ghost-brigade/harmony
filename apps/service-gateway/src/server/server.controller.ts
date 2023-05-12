import { ServerService } from "./server.service";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ServerCreateType } from "@harmony/zod";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("server")
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @ApiOperation({ summary: "Create a new server" })
  @ApiResponse({
    status: 201,
    description: "The server has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({})
  @Post()
  async createServer(@Body() createServerType: ServerCreateType) {
    return await this.serverService.createServer(createServerType);
  }

  @ApiOperation({ summary: "Get a server by ID" })
  @ApiResponse({
    status: 200,
    description: "The server has been successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Get(":id")
  async getServerById(@Param("id") id: string) {
    return await this.serverService.getServerById(id);
  }

  @ApiOperation({ summary: "Add a member to a server" })
  @ApiResponse({
    status: 200,
    description: "The member has been successfully added to the server.",
  })
  @ApiResponse({ status: 404, description: "Server or user not found" })
  @ApiResponse({
    status: 409,
    description: "User is already a member of the server",
  })
  @Put(":id/members")
  async addMemberToServer(
    @Param("id") serverId: string,
    @Body("memberId") memberId: string
  ) {
    return await this.serverService.addMemberToServer({ serverId, memberId });
  }

  // @Put(":id")
  // async updateServer(
  //   @Param("id") serverId: string,
  //   @Body(serverSchema) updateServerDto: typeof serverSchema
  // ) {
  //   const server = await this.serverService.updateServer(
  //     serverId,
  //     updateServerDto
  //   );
  //   return server.toObject();
  // }

  // @Delete(":id")
  // async deleteServer(@Param("id") serverId: string) {
  //   const server = await this.serverService.deleteServer(serverId);
  //   return server.toObject();
  // }

  // @Post(":id/members")
  // async addMemberToServer(
  //   @Param("id") serverId: string,
  //   @Body() addMemberDto: { userId: string }
  // ) {
  //   const server = await this.serverService.addMemberToServer(
  //     serverId,
  //     addMemberDto.userId
  //   );
  //   return server.toObject();
  // }

  // @Delete(":id/members/:userId")
  // async removeMemberFromServer(
  //   @Param("id") serverId: string,
  //   @Param("userId") userId: string
  // ) {
  //   const server = await this.serverService.removeMemberFromServer(
  //     serverId,
  //     userId
  //   );
  //   return server.toObject();
  // }
}
