import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  IdType,
  RoleCreateType,
  RoleParamsType,
  RoleType,
  UserContextType,
} from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";
import { RoleCreateService } from "./role-create.service";
import { RoleUpdateService } from "./role-update.service";
import { RoleDeleteService } from "./role-delete.service";
import { RoleUserService } from "./role-user.service";

@Controller()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleCreateService: RoleCreateService,
    private readonly roleUpdateService: RoleUpdateService,
    private readonly roleDeleteService: RoleDeleteService,
    private readonly roleUserService: RoleUserService
  ) {}

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ALL)
  async findAll(
    @Payload() payload: { params: RoleParamsType },
    @UserContext() user: UserContextType
  ) {
    return await this.roleService.findAll(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ONE)
  async findOneById(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.roleService.findOneBy(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.CREATE)
  async createRole(
    @Payload() payload: { role: RoleCreateType },
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
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.roleDeleteService.deleteRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.ADD_USER)
  async addUserToRole(
    @Payload() payload: { id: IdType; userId: IdType },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    return await this.roleUserService.addUsersToRole(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.INTERNAL_FIND_ROLE_BY)
  async internalFindRoleBy(
    @Payload() payload: { name?: string;
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
