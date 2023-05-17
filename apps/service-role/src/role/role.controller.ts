import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { MessagePattern } from "@nestjs/microservices";
import { RoleCreateType } from "@harmony/zod";

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(ROLE_MESSAGE_PATTERN.CREATE)
  async createRole({ role, user }: { role: RoleCreateType; user: any }) {
    return await this.roleService.createRole({ role });
  }
}
