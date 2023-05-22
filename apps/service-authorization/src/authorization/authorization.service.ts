import { UserContext } from '@harmony/nest-microservice';
import { Roles } from "@harmony/enums";
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

      if (!hasRight) {
        return await this.isAdmin(payload);
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
      const user: UserType = await firstValueFrom(
        this.clientAccount.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
          id: userId,
        })
      );

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
      const hasRight = await firstValueFrom(
        this.clientRole.send(ROLE_MESSAGE_PATTERN.INTERNAL_FIND_ROLE_BY, {
          serverId,
          userId,
          permissions,
        })
      );

      if (!hasRight) {
        return false;
      }

      /** Return true if user has one of the permissions in the array */
      return hasRight.some((permission) => permissions.includes(permission));
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
