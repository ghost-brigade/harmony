import {
  FormatZodResponse,
  RoleType,
  RoleSchema,
  UserContextType,
  RoleUpdateType,
  RoleUpdateSchema,
} from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";

@Injectable()
export class RoleUpdateService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel
  ) {}

  async updateRole(
    payload: {
      id: string;
      role: RoleUpdateType;
    },
    user: UserContextType
  ): Promise<RoleType> {
    const parse = RoleUpdateSchema.safeParse(payload.role);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    if (
      (await this.roleService.canManageRole({ serverId: payload.id, user })) ===
      false
    ) {
      throw new RpcException(
        new BadRequestException("You don't have permission to update role")
      );
    }

    const { name } = parse.data;

    this.roleService.isRoleNameValid({ name, throwError: true });

    //Todo: fix here throwError code 500 instead of 400
    await this.roleService.isRoleNameAlreadyExist({
      name,
      server: payload.id,
      throwError: true,
    });

    const role = await this.roleService.findOneBy(payload);

    // Check if role exists
    if (role === null) {
      throw new RpcException(new NotFoundException("Role doesn't exist"));
    }

    // Check if role is default
    if (role.name.startsWith("@")) {
      throw new RpcException(
        new BadRequestException("You can't update default roles name")
      );
    }

    try {
      return RoleSchema.parse(
        await this.roleModel.findOneAndUpdate({ _id: payload.id }, { name })
      );
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error updating role")
      );
    }
  }
}
