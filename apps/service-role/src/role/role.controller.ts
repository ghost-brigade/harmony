import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  IdType,
  RoleCreateType,
  RoleParamsType,
  RoleType,
  RolesPermissionType,
  UserContextType,
} from "@harmony/zod";
import { RoleCreateService } from "./role-create.service";
import { UserContext } from "@harmony/nest-microservice";

@Controller()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleCreateService: RoleCreateService
  ) {}

  @MessagePattern(ROLE_MESSAGE_PATTERN.HAS_RIGHTS)
  async hasRight({
    server,
    user,
    permissions,
  }: {
    server: IdType;
    user: IdType;
    permissions: RolesPermissionType;
  }): Promise<boolean> {
    return await this.roleService.hasRight({ server, user, permissions });
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ALL)
  async findAll(
    @Payload() payload: { params: RoleParamsType },
    @UserContext() user: UserContextType
  ) {
    return await this.roleService.findAll(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ONE)
  async findOneById(@Payload() payload: { id: IdType }, @UserContext() user: UserContextType) {
    return await this.roleService.findOneBy(payload, user);
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.CREATE)
  async createRole(
    @Payload() payload: { role: RoleCreateType },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    return await this.roleCreateService.createRole(payload, user);
  }
}
