import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  IdType,
  RoleCreateType,
  RoleParamsType,
  RolePermissionType,
  RoleType,
  UserContextType,
} from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";
import { RoleCreateService } from "./role-create.service";
import { RoleUpdateService } from "./role-update.service";
import { RoleDeleteService } from "./role-delete.service";
import { RoleUserService } from "./role-user.service";
import { RolePermissionService } from "./role-permission.service";

@Controller()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleCreateService: RoleCreateService,
    private readonly roleUpdateService: RoleUpdateService,
    private readonly roleDeleteService: RoleDeleteService,
    private readonly roleUserService: RoleUserService,
    private readonly rolePermissionService: RolePermissionService
  ) {}

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ALL)
  async findAll(
    @Payload() payload: { params: RoleParamsType },
    @UserContext() user: UserContextType
  ) {
    return (await this.roleService.findAll(payload, user)) ?? [];
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ONE)
  async findOneById(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.roleService.findOneById(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.CREATE)
  async createRole(
    @Payload() payload: { role: RoleCreateType; authorization?: boolean },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    return await this.roleCreateService.createRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.UPDATE)
  async updateRole(
    @Payload() payload: { id: IdType; role: RoleCreateType },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    return await this.roleUpdateService.updateRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.DELETE)
  async deleteRole(
    @Payload() payload: { id: IdType; authorization?: boolean },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.roleDeleteService.deleteRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.DELETE_ALL_BY_SERVER_ID)
  async deleteAllByServerId(
    @Payload() payload: { serverId: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.roleDeleteService.deleteAllRoles(payload);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.ADD_USER)
  async addUserToRole(
    @Payload() payload: { id: IdType; userId: IdType; authorization?: boolean },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    return await this.roleUserService.addUsersToRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.REMOVE_USER)
  async removeUserFromRole(
    @Payload() payload: { id: IdType; userId: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.roleUserService.removeUsersFromRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.ADD_PERMISSION)
  async addPermissionToRole(
    @Payload() payload: { id: IdType; permission: RolePermissionType },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    return await this.rolePermissionService.addPermissionToRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.REMOVE_PERMISSION)
  async removePermissionFromRole(
    @Payload() payload: { id: IdType; permission: RolePermissionType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.rolePermissionService.removePermissionFromRole(
      payload,
      user
    );
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.INTERNAL_FIND_ROLE_BY)
  async internalFindRoleBy(
    @Payload()
    payload: {
      name?: string;
      serverId?: IdType;
      permissions?: string[];
      usersId?: IdType[];
    },
    @UserContext() user: UserContextType
  ): Promise<RoleType[]> {
    return await this.roleService.findRoleBy(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.INTERNAL_IS_USER_IN_ROLE)
  async internalIsUserInRole(
    @Payload() payload: { id: IdType; userId: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.roleService.isUserInRole(payload, user);
  }
}
