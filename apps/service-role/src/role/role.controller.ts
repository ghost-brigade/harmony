import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
