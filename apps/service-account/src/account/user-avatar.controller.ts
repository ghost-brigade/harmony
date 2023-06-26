import { Controller, UseInterceptors } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";
import { UserContext } from "@harmony/nest-microservice";
// tslint:disable-next-line: no-unused-variable
import { Multer } from "multer";
import { UserContextType, UserPublicType } from "@harmony/zod";
import { UserAvatarService } from "./user-avatar.service";

@Controller()
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.CHANGE_AVATAR)
  async isUsernameAvailable(
    @Payload() payload: { file: Express.Multer.File },
    @UserContext() user: UserContextType
  ): Promise<UserPublicType> {
    return await this.userAvatarService.changeAvatar(payload, user);
  }
}
