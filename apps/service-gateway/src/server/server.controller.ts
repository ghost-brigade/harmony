import {
  SERVER_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import {
  IdType,
  ServerCreateDto,
  ServerCreateType,
  ServerDto,
  ServerUpdateDto,
  UserPublicDto,
  UserType,
} from "@harmony/zod";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceRequest, UserContext } from "@harmony/nest-microservice";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("server")
@ApiTags("Server")
export class ServerController {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @Get("search")
  async searchServers(@Query() search: { name: string }): Promise<any[]> {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.SEARCH,
      data: { search },
    });
  }

  @ApiOperation({ summary: "Create a new server" })
  @ApiResponse({
    status: 201,
    description: "The server has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createServer(@Body() ServerCreateType: ServerCreateDto) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.CREATE,
      data: { server: ServerCreateType },
    });
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post(":id/icon")
  async uploadServerIcon(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.UPLOAD_ICON,
      data: { serverId: id, file },
    });
  }

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
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.GET_BY_ID,
      data: { serverId: id },
    });
  }

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
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.GET_ALL,
      data: {},
    });
  }

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
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.UPDATE,
      data: { serverId: id, server: serverUpdateDto },
    });
  }

  @ApiOperation({ summary: "Delete a server" })
  @ApiResponse({
    status: 200,
    description: "The server has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Delete(":id")
  async delete(@Param("id") serverId: IdType) {
    console.log("delete server", serverId);
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.DELETE,
      data: { serverId },
    });
  }

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

  @ApiOperation({ summary: "Join a server" })
  @ApiResponse({
    status: 201,
    description: "Successfully joined the server.",
  })
  @ApiResponse({ status: 404, description: "Server not found" })
  @Post("join/:serverId")
  async joinServer(@Param("serverId") serverId: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.JOIN_SERVER,
      data: { serverId },
    });
  }

  @ApiOperation({ summary: "Leave a server" })
  @ApiResponse({
    status: 204,
    description: "Successfully leaved the server.",
  })
  @HttpCode(204)
  @ApiResponse({ status: 404, description: "Server not found" })
  @Delete("leave/:serverId")
  async leaveServer(@Param("serverId") serverId: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.LEAVE_SERVER,
      data: { serverId },
    });
  }

  @Post(":id/members/:memberId/ban")
  async banMember(
    @Param("id") serverId: string,
    @Param("memberId") memberId: string
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.BAN_MEMBER,
      data: { serverId, memberId },
    });
  }

  @Post(":id/members/:memberId/unban")
  async unbanMember(
    @Param("id") serverId: string,
    @Param("memberId") memberId: string
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SERVER_MESSAGE_PATTERN.UNBAN_MEMBER,
      data: { serverId, memberId },
    });
  }
}
