import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
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
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  RequestWithUser,
  getUserFromRequest,
} from "../core/utils/get-user-from-request";
import {
  RoleCreateDto,
  IdType,
  RoleUpdateDto,
  RoleParamsType,
} from "@harmony/zod";

@Controller("role")
@ApiTags("Role")
export class RoleController {
  constructor(
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, description: "Return all roles" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get()
  async getRoles(@Param() params?: RoleParamsType) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.FIND_ALL,
      params
    );
  }

  @ApiOperation({ summary: "Get all roles for a server" })
  @ApiResponse({ status: 200, description: "Return all roles" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("server/:id")
  async getRolesForServer(@Param("id") id: IdType) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.FIND_ALL,
      { server: id }
    );
  }

  @ApiOperation({ summary: "Get a role by id" })
  @ApiResponse({ status: 200, description: "Return a role by id" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Get(":id")
  async getRole(@Param("id") id: IdType, @Req() request: RequestWithUser) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.FIND_ONE,
      {
        id,
      }
    );
  }

  @ApiOperation({ summary: "Create a role for a server" })
  @ApiResponse({
    status: 201,
    description: "The role has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createRole(@Body() role: RoleCreateDto) {
    return this.serviceRequest.send(this.client, ROLE_MESSAGE_PATTERN.CREATE, {
      role,
    });
  }

  @ApiOperation({ summary: "Delete a role for a server" })
  @ApiResponse({
    status: 204,
    description: "The role has been successfully deleted.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Delete(":id")
  async deleteRole(@Param("id") id: IdType, @Req() request: RequestWithUser) {
    return this.serviceRequest.send(this.client, ROLE_MESSAGE_PATTERN.DELETE, {
      id,
    });
  }

  @ApiOperation({ summary: "Update a role for a server" })
  @ApiResponse({
    status: 200,
    description: "The role has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Put(":id")
  async updateRole(@Param("id") id: IdType, @Body() RoleUpdate: RoleUpdateDto) {
    return this.serviceRequest.send(this.client, ROLE_MESSAGE_PATTERN.UPDATE, {
      id,
      role: RoleUpdate,
    });
  }

  @ApiOperation({ summary: "Add a user to a role" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully added to the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post(":id/user")
  async addUserToRole(@Param("id") id: IdType, @Body() users: IdType[]) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.ADD_USER,
      {
        id,
        users,
      }
    );
  }

  @ApiOperation({ summary: "Remove a user from a role" })
  @ApiResponse({
    status: 204,
    description: "The user has been successfully removed from the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Delete(":id/user/:userId")
  async removeUserFromRole(
    @Param("id") id: IdType,
    @Param("userId") userId: IdType
  ) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.REMOVE_USER,
      {
        id,
        userId,
      }
    );
  }

  @ApiOperation({ summary: "Add a permission to a role" })
  @ApiResponse({
    status: 201,
    description: "The permission has been successfully added to the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post(":id/permission")
  async addPermissionToRole(
    @Param("id") id: IdType,
    @Body() permissions: IdType[]
  ) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.ADD_PERMISSION,
      {
        id,
        permissions,
      }
    );
  }

  @ApiOperation({ summary: "Remove a permission from a role" })
  @ApiResponse({
    status: 204,
    description: "The permission has been successfully removed from the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Delete(":id/permission/:permissionId")
  async removePermissionFromRole(
    @Param("id") id: IdType,
    @Param("permissionId") permissionId: IdType
  ) {
    return this.serviceRequest.send(
      this.client,
      ROLE_MESSAGE_PATTERN.REMOVE_PERMISSION,
      {
        id,
        permissionId,
      }
    );
  }
}
