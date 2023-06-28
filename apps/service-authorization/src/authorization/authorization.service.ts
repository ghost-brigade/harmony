import { UserContext, ServiceRequest } from "@harmony/nest-microservice";
import { Permissions, Roles } from "@harmony/enums";
import {
  ACCOUNT_MESSAGE_PATTERN,
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  IdType,
  FormatZodResponse,
  RolesPermissionType,
  UserContextType,
  RolesPermissionSchema,
  UserType,
  RoleType,
} from "@harmony/zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly clientRole: ClientProxy,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly clientAccount: ClientProxy
  ) {}

  public async hasRight(
    payload: {
      serverId: IdType;
      userId: IdType;
      permissions: RolesPermissionType;
    },
    user: UserContextType
  ): Promise<boolean> {
    try {
      RolesPermissionSchema.parse(payload.permissions);

      const hasRight = await this.checkServerPermissions(payload);

      // console.log(payload);

      if (!hasRight) {
        return await this.isAdmin(payload, user);
      }

      return hasRight;
    } catch (error) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(error.issues))
      );
    }
  }

  public async isAdmin(
    {
      userId,
    }: {
      userId: IdType;
    },
    user: UserContextType
  ): Promise<boolean> {
    try {
      const user: UserType = await this.serviceRequest.send({
        client: this.clientAccount,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
        data: {
          id: userId,
        },
        promise: true,
      });

      if ([Roles.ADMIN, Roles.MODERATOR].includes(user.role)) {
        return true;
      }

      return false;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  private async checkServerPermissions({
    serverId,
    userId,
    permissions,
  }: {
    serverId: IdType;
    userId: IdType;
    permissions: RolesPermissionType;
  }): Promise<boolean> {
    try {
      const hasRight: RoleType[] = await this.serviceRequest.send({
        client: this.clientRole,
        pattern: ROLE_MESSAGE_PATTERN.INTERNAL_FIND_ROLE_BY,
        data: {
          serverId,
          userId,
          permissions: [...permissions, Permissions.SERVER_ADMIN],
        },
        promise: true,
      });

      if (!hasRight) {
        return false;
      }

      const permissionsAdmin = [...permissions, Permissions.SERVER_ADMIN];

      return hasRight
        .map((role) => role.permissions)
        .flat()
        .some((permission) => permissionsAdmin.includes(permission));
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
