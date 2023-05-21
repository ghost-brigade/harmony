import { Services, getServiceProperty } from "@harmony/service-config";
import { RoleType, IdType } from "@harmony/zod";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";

@Injectable()
export class RoleUserService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly account: ClientProxy
  ) {}

  async addUsersToRole({ role, user }: { role: IdType; user: IdType }) {
    // TODO: check if author of request is allowed to add users to role
    // TODO: check if user exists
    // TODO: check if role exists
    // TODO: check if user is already in role
    //
  }

  async removeUsersFromRole({ role, user }: { role: IdType; user: IdType }) {}
}
