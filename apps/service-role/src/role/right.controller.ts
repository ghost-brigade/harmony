import { RightService } from "./right.service";
import { ROLE_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { IdType, RolesPermissionType, UserContextType } from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";

@Controller()
export class RightController {
  constructor(private readonly rightService: RightService) {}

  @MessagePattern(ROLE_MESSAGE_PATTERN.HAS_RIGHTS)
  async hasRight(
    @Payload()
    payload: {
      serverId: IdType;
      userId: IdType;
      permissions: RolesPermissionType;
    },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.rightService.hasRight(payload, user);
  }
}
