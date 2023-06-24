import {
  SERVER_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
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
  Req,
} from "@nestjs/common";
import {
  ServerCreateDto,
  ServerCreateType,
  ServerDto,
  ServerUpdateDto,
  UserPublicDto,
} from "@harmony/zod";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import {
  RequestWithUser,
  getUserFromRequest,
} from "../core/utils/get-user-from-request";

@Controller("server")
export class ServerController {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiTags("Server")
  @ApiOperation({ summary: "Create a new server" })
  @ApiResponse({
    status: 201,
    description: "The server has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createServer(
    @Body() ServerCreateType: ServerCreateDto,
    @Req() request: RequestWithUser
  ) {
    return this.client.send(SERVER_MESSAGE_PATTERN.CREATE, {
      server: ServerCreateType,
      user: await getUserFromRequest(request),
    });
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Get a server by ID" })
  @ApiOkResponse({
    description: "Server",
    type: ServerDto,
    isArray: false,
  })
  @ApiResponse({
    status: 200,
    description: "The server has been successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Get(":id")
  async getServerById(@Param("id") id: string) {
    return this.client.send(SERVER_MESSAGE_PATTERN.GET_BY_ID, id);
  }

  @ApiTags("Server")
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
    return this.client.send(SERVER_MESSAGE_PATTERN.ADD_MEMBER, {
      serverId,
      memberId,
    });
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Get all servers" })
  @ApiOkResponse({
    description: "Server",
    type: ServerDto,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all servers.",
  })
  @Get()
  async getAllServers() {
    return this.client.send(SERVER_MESSAGE_PATTERN.GET_ALL, {});
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Update a server" })
  @ApiResponse({
    status: 200,
    description: "The server has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Put(":id")
  async updateServer(
    @Param("id") id: string,
    @Body() serverUpdateDto: ServerUpdateDto
  ) {
    return this.client.send(SERVER_MESSAGE_PATTERN.UPDATE, {
      id,
      server: serverUpdateDto,
    });
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Delete a server" })
  @ApiResponse({
    status: 200,
    description: "The server has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Delete(":id")
  async deleteServer(
    @Param("id") serverId: string,
    @Req() request: RequestWithUser
  ) {
    return this.client.send(SERVER_MESSAGE_PATTERN.DELETE, {
      serverId,
      user: await getUserFromRequest(request),
    });
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Remove a member from a server" })
  @ApiResponse({
    status: 200,
    description: "The member has been successfully removed from the server.",
  })
  @ApiResponse({ status: 404, description: "Server or user not found" })
  @Delete(":id/members/:memberId")
  async removeMemberFromServer(
    @Param("id") serverId: string,
    @Param("memberId") memberId: string
  ) {
    return this.client.send(SERVER_MESSAGE_PATTERN.REMOVE_MEMBER, {
      serverId,
      memberId,
    });
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Get all members of a server" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all members of the server.",
  })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Get(":id/members")
  async getServerMembers(@Param("id") serverId: string) {
    return this.client.send(
      SERVER_MESSAGE_PATTERN.GET_MEMBERS_OF_SERVER,
      serverId
    );
  }

  @ApiTags("Server")
  @ApiOperation({ summary: "Get all servers of a member" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all servers of the member.",
  })
  @ApiOkResponse({
    description: "User",
    type: UserPublicDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: "Member not found" })
  @Get("member/:id/servers")
  async getMemberServers(@Param("id") memberId: string) {
    return this.client.send(
      SERVER_MESSAGE_PATTERN.GET_SERVERS_OF_MEMBER,
      memberId
    );
  }
}
