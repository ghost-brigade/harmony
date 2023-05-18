import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { MessagePattern } from "@nestjs/microservices";
import { RoleCreateType, RoleParamsType, RoleType } from "@harmony/zod";
import { RoleCreateService } from "./role-create.service";

@Controller()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleCreateService: RoleCreateService
  ) {}

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ALL)
  async getRoles({ params, user }: { params: RoleParamsType; user: any }) {
    //return await this.roleService.getRoles(params);
    return "getRoles";
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.FIND_ONE)
  async getRole(id: string) {
    //return await this.roleService.getRole(id);
    return "getRole";
  }

  @MessagePattern(ROLE_MESSAGE_PATTERN.CREATE)
  async createRole({ role, user }: { role: RoleCreateType; user: any }): Promise<RoleType> {
    return await this.roleCreateService.createRole({ role, user });
  }
}
