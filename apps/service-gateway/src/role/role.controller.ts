import {
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  RequestWithUser,
  getUserFromRequest,
} from "../core/utils/get-user-from-request";
import { RoleCreateDto } from "@harmony/zod";

@Controller("role")
@ApiTags("Role")
export class RoleController {
  constructor(
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiOperation({ summary: "Create a role for a server" })
  @ApiResponse({
    status: 201,
    description: "The role has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createRole(
    @Body() RoleCreateType: RoleCreateDto,
    @Req() request: RequestWithUser
  ) {
    return this.client.send(ROLE_MESSAGE_PATTERN.CREATE, {
      role: RoleCreateType,
      user: await getUserFromRequest(request),
    });
  }
}
