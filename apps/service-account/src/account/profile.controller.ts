import { UserService } from "./user.service";
import { UserJwtType, userType } from "@harmony/zod";
import { Controller, InternalServerErrorException } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";

@Controller()
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get the profile of the current logged in user.
   */
  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.PROFILE)
  async profile({ user }: { user: UserJwtType }): Promise<userType> {
    try {
      return await this.userService.profile({ user });
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.response));
    }
  }
}
