import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  IdType,
  RoleCreateType,
  RoleParamsType,
  RoleType,
  RolesPermissionType,
} from "@harmony/zod";
import { RoleCreateService } from "./role-create.service";

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
  async findAll({ params, user }: { params: RoleParamsType; user: any }) {
    return await this.roleService.findAll({ params, user });
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ONE)
  async findOneById({ id, user }: { id: IdType; user: any }) {
    return await this.roleService.findOneBy({ id, user });
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.CREATE)
  async createRole({
    role,
    user,
  }: {
    role: RoleCreateType;
    user: any;
  }): Promise<RoleType> {
    return await this.roleCreateService.createRole({ role, user });
  }
}
