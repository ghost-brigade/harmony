import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import {
  IdType,
  UserContextType,
  RolePermissionType,
  RoleType,
  IdSchema,
  FormatZodResponse,
  RolePermissionSchema,
} from "@harmony/zod";
import { Payload, RpcException } from "@nestjs/microservices";
import { UserContext } from "@harmony/nest-microservice";

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel
  ) {}

  async addPermissionToRole(
    @Payload() payload: { id: IdType; permission: RolePermissionType },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    /**
     * Validate payload
     */
    const idParsed = IdSchema.safeParse(payload.id);
    if (idParsed.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(idParsed.error.issues))
      );
    }

    const permissionParsed = RolePermissionSchema.safeParse(payload.permission);
    if (permissionParsed.success === false) {
      throw new RpcException(
        new BadRequestException(
          FormatZodResponse(permissionParsed.error.issues)
        )
      );
    }

    /**
     * Check if user has permission to manage role
     */
    if (
      (await this.roleService.canManageRole({ serverId: payload.id, user })) ===
      false
    ) {
      throw new RpcException(
        new BadRequestException("You don't have permission to update role")
      );
    }

    /**
     * Check if role exists
     */
    // Check if role exists
    if ((await this.roleService.findOneBy(payload)) === null) {
      throw new RpcException(new BadRequestException("Role doesn't exist"));
    }

    /**
     * Check if permission is already in role
     */
    if ((await this.roleService.isPermissionInRole(payload)) === true) {
      throw new RpcException(
        new BadRequestException("Permission is already in role")
      );
    }

    /**
     * Add permission to role
     */
    try {
      return await this.roleModel.findOneAndUpdate(
        { _id: payload.id },
        { $push: { permissions: payload.permission } },
        { returnOriginal: false }
      );
    } catch (e) {
      throw new RpcException(
        new BadRequestException("Failed to add permission to role")
      );
    }
  }

  async removePermissionFromRole() {
    return;
  }
}
