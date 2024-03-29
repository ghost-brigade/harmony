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
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  RoleCreateDto,
  IdType,
  RoleUpdateDto,
  RoleParamsType,
  RolePermissionType,
} from "@harmony/zod";

@Controller("role")
@ApiTags("Role")
export class RoleController {
  constructor(
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  // @ApiOperation({ summary: "Get all roles" })
  // @ApiResponse({ status: 200, description: "Return all roles" })
  // @ApiResponse({ status: 400, description: "Bad request" })
  // @ApiUnauthorizedResponse({ description: "Unauthorized" })
  // @Get()
  // async getRoles(@Param() data?: RoleParamsType) {
  //   return this.serviceRequest.send({
  //     client: this.client,
  //     pattern: ROLE_MESSAGE_PATTERN.FIND_ALL,
  //     data,
  //   });
  // }

  @ApiOperation({ summary: "Get all roles for a server" })
  @ApiResponse({ status: 200, description: "Return all roles" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiParam({ name: "id", type: "string" })
  @Get("server/:id")
  async getRolesForServer(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.FIND_ALL,
      data: { server: id },
    });
  }

  @ApiOperation({ summary: "Get a role by id" })
  @ApiResponse({ status: 200, description: "Return a role by id" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "id", type: "string" })
  @Get(":id")
  async getRole(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.FIND_ONE,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Create a role for a server" })
  @ApiResponse({
    status: 201,
    description: "The role has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createRole(@Body() role: RoleCreateDto) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.CREATE,
      data: { role },
    });
  }

  @ApiOperation({ summary: "Delete a role for a server" })
  @ApiResponse({
    status: 204,
    description: "The role has been successfully deleted.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(204)
  @ApiParam({ name: "id", type: "string" })
  @Delete(":id")
  async deleteRole(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Update a role for a server" })
  @ApiResponse({
    status: 200,
    description: "The role has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "id", type: "string" })
  @ApiBody({ type: RoleUpdateDto })
  @Put(":id")
  async updateRole(@Param("id") id: IdType, @Body() RoleUpdate: RoleUpdateDto) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.UPDATE,
      data: {
        id,
        role: RoleUpdate,
      },
    });
  }

  @ApiOperation({ summary: "Add a user to a role" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully added to the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "id", type: "string" })
  @Post(":id/user")
  async addUserToRole(@Param("id") id: IdType, @Body() userId: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.ADD_USER,
      data: Object.assign(userId, {
        id,
      }),
    });
  }

  @ApiOperation({ summary: "Remove a user from a role" })
  @ApiResponse({
    status: 204,
    description: "The user has been successfully removed from the role.",
  })
  @HttpCode(204)
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "userId", type: "string" })
  @Delete(":id/user/:userId")
  async removeUserFromRole(
    @Param("id") id: IdType,
    @Param("userId") userId: IdType
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.REMOVE_USER,
      data: {
        id,
        userId,
      },
    });
  }

  @ApiOperation({ summary: "Add a permission to a role" })
  @ApiResponse({
    status: 201,
    description: "The permission has been successfully added to the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "id", type: "string" })
  @Post(":id/permission")
  async addPermissionToRole(
    @Param("id") id: IdType,
    @Body() permission: IdType[]
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.ADD_PERMISSION,
      data: Object.assign(permission, {
        id,
      }),
    });
  }

  @ApiOperation({ summary: "Remove a permission from a role" })
  @ApiResponse({
    status: 204,
    description: "The permission has been successfully removed from the role.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "permission", type: "string" })
  @HttpCode(204)
  @Delete(":id/permission/:permission")
  async removePermissionFromRole(
    @Param("id") id: IdType,
    @Param("permission") permission: RolePermissionType
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ROLE_MESSAGE_PATTERN.REMOVE_PERMISSION,
      data: {
        id,
        permission,
      },
    });
  }
}
