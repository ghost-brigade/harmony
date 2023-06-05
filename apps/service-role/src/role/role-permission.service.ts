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
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel
  ) {}

  async addPermissionToRole(
    payload: { id: IdType; permission: RolePermissionType },
    user: UserContextType
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

  async removePermissionFromRole(
    payload: { id: IdType; permission: RolePermissionType },
    user: UserContextType
  ): Promise<boolean> {
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
    if ((await this.roleService.findOneBy(payload)) === null) {
      throw new RpcException(new BadRequestException("Role doesn't exist"));
    }

    /**
     * Check if permission is already in role
     */
    if ((await this.roleService.isPermissionInRole(payload)) === false) {
      throw new RpcException(
        new BadRequestException("Permission is not in role")
      );
    }

    /**
     * Remove permission from role
     */
    try {
      await this.roleModel.updateOne(
        { _id: payload.id },
        { $pull: { permissions: payload.permission } }
      );

      return true;
    } catch (e) {
      throw new RpcException(
        new BadRequestException("Failed to remove permission from role")
      );
    }
  }
}
