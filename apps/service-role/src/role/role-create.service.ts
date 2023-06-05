import {
  FormatZodResponse,
  RoleCreateSchema,
  RoleCreateType,
  RoleType,
  RoleSchema,
  UserContextType,
} from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";

@Injectable()
export class RoleCreateService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel
  ) {}

  async createRole(
    payload: {
      role: RoleCreateType;
    },
    user: UserContextType
  ): Promise<RoleType> {
    const parse = RoleCreateSchema.safeParse(payload.role);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    if (
      (await this.roleService.canManageRole({
        serverId: payload.role.server,
        user,
      })) === false
    ) {
      throw new RpcException(
        new BadRequestException("You don't have permission to create role")
      );
    }

    const { name, server, permissions } = parse.data;

    this.roleService.isRoleNameValid({ name, throwError: true });

    await this.roleService.isRoleNameAlreadyExist({
      name,
      server,
      throwError: true,
    });

    try {
      const newRole = new this.roleModel({
        name,
        server,
        permissions,
      });
      return RoleSchema.parse(await newRole.save());
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error creating role")
      );
    }
  }
}
