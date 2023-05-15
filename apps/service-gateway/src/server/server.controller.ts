import { SERVER_MESSAGE_PATTERN, Services, getServiceProperty } from "@harmony/service-config";
import { ServerService } from "./server.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ServerCreateDto, ServerCreateType } from "@harmony/zod";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";

@Controller("server")
export class ServerController {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiOperation({ summary: "Create a new server" })
  @ApiResponse({
    status: 201,
    description: "The server has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createServer(@Body() ServerCreateType: ServerCreateDto) {
    return this.client.send(SERVER_MESSAGE_PATTERN.CREATE, ServerCreateType);
  }

  // @ApiOperation({ summary: "Get a server by ID" })
  // @ApiResponse({
  //   status: 200,
  //   description: "The server has been successfully retrieved.",
  // })
  // @ApiResponse({ status: 404, description: "Server not found" })
  // @Get(":id")
  // async getServerById(@Param("id") id: string) {
  //   return await this.serverService.getServerById(id);
  // }

  // @ApiOperation({ summary: "Add a member to a server" })
  // @ApiResponse({
  //   status: 200,
  //   description: "The member has been successfully added to the server.",
  // })
  // @ApiResponse({ status: 404, description: "Server or user not found" })
  // @ApiResponse({
  //   status: 409,
  //   description: "User is already a member of the server",
  // })
  // @Put(":id/members")
  // async addMemberToServer(
  //   @Param("id") serverId: string,
  //   @Body("memberId") memberId: string
  // ) {
  //   return await this.serverService.addMemberToServer({ serverId, memberId });
  // }
}
