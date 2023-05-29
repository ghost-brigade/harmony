import { AUTHORIZATION_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { AuthorizationService } from "./authorization.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserContext } from "@harmony/nest-microservice";
import { IdType, RolesPermissionType, UserContextType } from "@harmony/zod";

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @MessagePattern(AUTHORIZATION_MESSAGE_PATTERN.IS_ADMIN)
  async isAdmin(
    @Payload()
    payload: {
      userId: IdType;
    },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.authorizationService.isAdmin(payload, user);
  }

  @MessagePattern(AUTHORIZATION_MESSAGE_PATTERN.HAS_RIGHTS)
  async hasRight(
    @Payload()
    payload: {
      serverId: IdType;
      userId: IdType;
      permissions: RolesPermissionType;
    },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.authorizationService.hasRight(payload, user);
  }
}
