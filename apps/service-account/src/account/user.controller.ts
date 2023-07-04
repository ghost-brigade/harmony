import {
  Controller,
  InternalServerErrorException,
  UseInterceptors,
} from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { UserService } from "./user.service";
import {
  IdType,
  UserBanType,
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
  async findAllByIds(@Payload() payload: { ids: IdType[] }) {
    return await this.userService.findAllByIds(payload);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ONE)
  async findOne(data: UserType) {
    try {
      let user: UserType;
      if (Object.keys(data).length === 2 && "id" in data) {
        user = await this.userService.findOne(data.id);
      } else {
        user = await this.userService.findOneBy(data);
      }

      return user;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting user")
      );
    }
  }
  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ONE_FRIEND)
  async findOneFriend(data: UserType) {
    try {
      const user = await this.userService.findOne(data.id);
      return user;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting user")
      );
    }
  }
  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ALL_FRIENDS)
  async findAllFriends(data) {
    try {
      const user = await this.userService.findAllFriends(data);
      return user;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting user")
      );
    }
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ALL_FRIEND_REQUEST)
  async findAllFriendRequest(data) {
    try {
      const user = await this.userService.findAllFriendRequest(data);
      return user;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting user")
      );
    }
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.FIND_ONE_BY_USERNAME)
  async findOneByUsername(
    @Payload() payload: { username: string },
    @UserContext() user
  ) {
    try {
      return await this.userService.findOneByUsername(payload, user);
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting user")
      );
    }
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.CREATE)
  async create(data: UserCreateType): Promise<UserPublicType> {
    return await this.userService.create(data);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.UPDATE)
  async update(
    @Payload() payload: { id: IdType; updateUser: UserUpdateType },
    @UserContext() user: UserContextType
  ) {
    return await this.userService.update(payload, user);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.BAN_USER)
  async banUser(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<Boolean> {
    return await this.userService.banUser(payload, user);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.BANNED_USERS)
  async findAllBannedUsers(@UserContext() user: UserContextType) {
    console.log("findAllBannedUser controller service");
    return await this.userService.findAllBannedUsers(user);
  }

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.CANCEL_BAN_USER)
  async cancelBanUser(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<Boolean> {
    return await this.userService.cancelBanUser(payload, user);
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
