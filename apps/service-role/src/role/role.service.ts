import { FormatZodResponse, RoleCreateType, RoleSchema } from "@harmony/zod";
import { RoleType } from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RoleService {
  constructor(@InjectModel("Role") private readonly roleModel) {}

  async createRole({role}: {role: RoleCreateType}) {
    const parse = RoleSchema.safeParse(role);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const { name, server } = parse.data;

    const isRoleExist = await this.getRoleByNameAndServerId(name, server);

    console.log(isRoleExist);
    const newRole = new this.roleModel(role);
    return await newRole.save();
  }

  private async getRoleByNameAndServerId(name: string, serverId: string) {
    try {
      return await this.roleModel.findOne({ name, serverId });
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
