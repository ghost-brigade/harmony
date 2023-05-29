import { FormatZodResponse, UserContextType, IdSchema } from "@harmony/zod";
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
export class RoleDeleteService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel
  ) {}

  async deleteRole(
    payload: {
      id: string;
    },
    user: UserContextType
  ): Promise<boolean> {
    const parse = IdSchema.safeParse(payload.id);

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
        new BadRequestException("You don't have permission to delete role")
      );
    }

    // Check if role exists
    if ((await this.roleService.findOneBy(payload)) === null) {
      throw new RpcException(new NotFoundException("Role doesn't exist"));
    }

    try {
      await this.roleModel.deleteOne({
        _id: payload.id,
      });

      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error deleting role")
      );
    }
  }
}
