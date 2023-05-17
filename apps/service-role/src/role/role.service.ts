import {
  FormatZodResponse,
  RoleCreateSchema,
  RoleCreateType,
  IdType,
  RoleType,
  RoleSchema
} from "@harmony/zod";
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

  async createRole({ role, user }: { role: RoleCreateType; user: any }) {
    const parse = RoleCreateSchema.safeParse(role);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const { name, server } = parse.data;

    const isRoleExist = await this.getRoleByNameAndServerId({ name, server });
    if (isRoleExist) {
      throw new RpcException(
        new BadRequestException(
          `Role with name ${name} already exist on this server`
        )
      );
    }

    const newRole = new this.roleModel(role);
    return RoleSchema.parse((await newRole.save()) as RoleType);
  }

  private async getRoleByNameAndServerId({
    name,
    server,
  }: {
    name: string;
    server: IdType;
  }) {
    try {
      return await this.roleModel.findOne({ name, server }).exec();
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
