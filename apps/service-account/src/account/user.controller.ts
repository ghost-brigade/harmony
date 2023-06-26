import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "./user.service";
import {
  IdType,
  UserContextType,
  UserCreateType,
  UserParamsType,
  UserPublicType,
  UserType,
  UserUpdateType,
  UsernameStatusType,
} from "@harmony/zod";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";
import { UserContext } from "@harmony/nest-microservice";
import { User } from "@harmony/nest-schemas";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.USERNAME_AVAILABLE)
  async isUsernameAvailable(
    @Payload() payload: { username: string },
    @UserContext() user: UserContextType
  ): Promise<UsernameStatusType> {
    return await this.userService.isUsernameAvailable(payload, user);
  }

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
  async create(data: UserCreateType): Promise<UserPublicType> {
    return await this.userService.create(data);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.UPDATE)
  async update(
    @Payload() payload: { id: IdType; updateUser: UserUpdateType },
    @UserContext() user: UserContextType,
    )  {
    return await this.userService.update(payload, user);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.IS_ACTIVE)
  async isUserAccountActive(
    @Payload()
    payload: {
      ids?: IdType[];
      usernames?: string[];
      emails?: string[];
    },
    @UserContext() user: UserContextType
  ): Promise<UserPublicType[]> {
    return await this.userService.isUsersAccountActive(payload, user);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.IS_EXIST)
  async isUsersAccountExist(
    @Payload()
    payload: {
      ids?: IdType[];
      usernames?: string[];
      emails?: string[];
    },
    @UserContext() user: UserContextType
  ): Promise<UserPublicType[]> {
    return await this.userService.isUsersAccountExist(payload, user);
  }
}
