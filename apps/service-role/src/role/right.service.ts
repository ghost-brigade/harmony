import { Roles } from "@harmony/enums";
import {
  ACCOUNT_MESSAGE_PATTERN,
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
import { InjectModel } from "@nestjs/mongoose";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RightService {
  constructor(
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
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
        return await this.checkGlobalPermissions(payload);
      }

      return hasRight;
    } catch (error) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(error.issues))
      );
    }
  }

  private async checkGlobalPermissions({
    userId,
  }: {
    userId: IdType;
  }): Promise<boolean> {
    try {
      const user: UserType = await firstValueFrom(
        this.client.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
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
      const hasRight = await this.roleModel
        .find({
          server: serverId,
          permissions: { $in: permissions },
          users: { $in: [userId] },
        })
        .exec();

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
