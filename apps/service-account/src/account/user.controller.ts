import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import {
  IdType,
  UserCreateType,
  UserParamsType,
  UserPublicType,
  UserType,
} from "@harmony/zod";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ALL)
  async findAll(params: UserParamsType) {
    return await this.userService.findAll(params);
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
  async create(data: UserCreateType): Promise<UserPublicType> {
    return await this.userService.create(data);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.UPDATE)
  async update(data: UserType): Promise<UserPublicType> {
    return await this.userService.update(data);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.IS_ACTIVE)
  async isActive({
    ids,
    usernames,
    emails,
  }: {
    ids?: IdType[];
    usernames?: string[];
    emails?: string[];
  }): Promise<UserPublicType[] | undefined> {
    return await this.userService.isUsersAccountActive({
      ids,
      usernames,
      emails,
    });
  }
}
