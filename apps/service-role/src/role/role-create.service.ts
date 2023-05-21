import { Services, getServiceProperty } from "@harmony/service-config";
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
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";

@Injectable()
export class RoleCreateService {
  constructor(
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  async createRole(
    payload: {
      role: RoleCreateType;
    },
    user: UserContextType
  ): Promise<RoleType> {
    const parse = RoleCreateSchema.safeParse(payload.role);

    if (parse.success === false) {
      console.log(parse.error);
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const { name, server, permissions } = parse.data;

    await this.roleService.isRoleAlreadyExist({
      name,
      server,
      throwError: true,
    });

    /* use this on add user to role */
    /*
    await this.roleService.isUserInServer({
      user,
      server,
      throwError: true,
    });
    */

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
