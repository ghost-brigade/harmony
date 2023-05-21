import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { UserParamsType, UserType } from "@harmony/zod";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ALL)
  async findAll(params: UserParamsType) {
    return await this.userService.findAll(params);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS)
  async findAllByIds(data) {
    return await this.userService.findAllByIds(data.ids);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ONE)
  async findOne(data: UserType) {
    try {
      let user: UserType;

      if (Object.keys(data).length === 1 && "id" in data) {
        user = await this.userService.findOne(data.id);
      } else {
        user = await this.userService.findOneBy(data);
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.CREATE)
  async create(data) {
    return await this.userService.create(data);
  }
}
