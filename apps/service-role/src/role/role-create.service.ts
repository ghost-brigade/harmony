import { ServiceRequest } from "@harmony/nest-microservice";
import {
  AUTHORIZATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
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
import { Permissions } from "@harmony/enums";

@Injectable()
export class RoleCreateService {
  constructor(
    private readonly serviceRequest: ServiceRequest,
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.AUTHORIZATION, "name"))
    private readonly client: ClientProxy
  ) {}

  async canCreateRole(
    payload: {
      role: RoleCreateType;
    },
    user: UserContextType
  ) {
    try {
      return await this.serviceRequest.send({
        client: this.client,
        pattern: AUTHORIZATION_MESSAGE_PATTERN.HAS_RIGHTS,
        data: {
          serverId: payload.role.server,
          userId: user.id,
          permissions: [Permissions.ROLE_MANAGE],
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error checking permissions")
      );
    }
  }

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

    if ((await this.canCreateRole(payload, user)) === false) {
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
