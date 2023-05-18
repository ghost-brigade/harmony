import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FormatZodResponse,
  RoleCreateSchema,
  RoleCreateType,
  IdType,
  RoleType,
  RoleSchema,
  RoleUserType,
} from "@harmony/zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { Observable, firstValueFrom } from "rxjs";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  async createRole({ role, user }: { role: RoleCreateType; user: any }) {
    const parse = RoleCreateSchema.safeParse(role);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const { name, server, permissions, users } = parse.data;

    const isRoleExist = await this.getRoleByNameAndServerId({ name, server });
    if (isRoleExist) {
      throw new RpcException(
        new BadRequestException(
          `Role with name ${name} already exist on this server`
        )
      );
    }

    if (users) {
      const verifyUsers = await this.verifiyUsers({ users });
      if (!verifyUsers) {
        throw new RpcException(
          new BadRequestException(`At least one user does not exist`)
        );
      }
    }

    const newRole = new this.roleModel(role);
    //return RoleSchema.parse((await newRole.save()) as RoleType);
    return newRole;
  }

  private async verifiyUsers({
    users,
  }: {
    users: RoleUserType;
  }): Promise<boolean> {
    return await firstValueFrom(
      this.client.send(ACCOUNT_MESSAGE_PATTERN.VERIFY_USERS, users)
    );
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
