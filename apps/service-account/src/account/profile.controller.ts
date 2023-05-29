import { UserService } from "./user.service";
import { UserContextType, UserType } from "@harmony/zod";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";
import { UserContext } from "@harmony/nest-microservice";

@Controller()
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get the profile of the current logged in user.
   */
  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.PROFILE)
  async profile(@UserContext() user: UserContextType): Promise<UserType> {
    return await this.userService.profile({ user });
  }
}
