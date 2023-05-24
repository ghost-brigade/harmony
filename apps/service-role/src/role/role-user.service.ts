import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";
import { Injectable } from "@nestjs/common";
import { IdType } from "@harmony/zod";

@Injectable()
export class RoleUserService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel
  ) {}

  async addUsersToRole({ role, user }: { role: IdType; user: IdType }) {
    // TODO: check if author of request is allowed to add users to role
    // TODO: check if user exists
    // TODO: check if role exists
    // TODO: check if user is already in role
    //
    return;
  }

  async removeUsersFromRole({ role, user }: { role: IdType; user: IdType }) {
    return;
  }
}
