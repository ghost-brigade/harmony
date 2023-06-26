import { Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  AUTHORIZATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { IdType, UserContextType } from "@harmony/zod";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";

@Injectable()
export class ChannelAuthorizationService {
  constructor(
    @Inject(getServiceProperty(Services.AUTHORIZATION, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  public async canViewChannel({
    serverId,
    user,
  }: {
    serverId: IdType;
    user: UserContextType;
  }): Promise<boolean> {
    return await this.checkPermissions({
      serverId,
      user,
      permissions: [Permissions.CHANNEL_VIEW],
    });
  }

  public async canManageChannel({
    serverId,
    user,
  }: {
    serverId: IdType;
    user: UserContextType;
  }): Promise<boolean> {
    return await this.checkPermissions({
      serverId,
      user,
      permissions: [Permissions.CHANNEL_MANAGE],
    });
  }

  private async checkPermissions({
    serverId,
    user,
    permissions,
  }: {
    serverId: IdType;
    user: UserContextType;
    permissions: Permissions[];
  }): Promise<boolean> {
    try {
      return await this.serviceRequest.send({
        client: this.client,
        pattern: AUTHORIZATION_MESSAGE_PATTERN.HAS_RIGHTS,
        data: {
          serverId,
          userId: user.id,
          permissions,
        },
        promise: true,
      });
    } catch (error) {
      /**
       * Non blocking error
       */
      return false;
      // throw new RpcException(
      //   new InternalServerErrorException("Error checking channel permissions")
      // );
    }
  }
}
