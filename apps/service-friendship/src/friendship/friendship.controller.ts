import { Controller, Get, UseInterceptors } from "@nestjs/common";

import { FriendRequestService } from "./friendRequest/friendRequest.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  FRIENDREQUEST_MESSAGE_PATTERN,
  FRIEND_MESSAGE_PATTERN,
} from "@harmony/service-config";
import {
  FriendParamsType,
  FriendRequestParamsType,
  IdType,
  UserContextType,
} from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";
import { FriendService } from "./friend/friend.service";
import { FindFriend } from "./interceptor/findFriend.interceptor";
import { FindAllFriends } from "./interceptor/findAllFriends.interceptor";
import { FindAllFriendRequest } from "./interceptor/findAllFriendRequest.interceptor";
import { FindFriendRequest } from "./interceptor/findFriendRequest.interceptor";

@Controller()
export class FriendshipController {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private readonly friendService: FriendService
  ) {}

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.FIND_ALL)
  @UseInterceptors(FindAllFriendRequest)
  async findAll(@UserContext() user: UserContextType) {
    return (await this.friendRequestService.findAll(user)) ?? [];
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.FIND_ALL_SENT)
  @UseInterceptors(FindAllFriendRequest)
  async findAllSent(@UserContext() user: UserContextType) {
    return (await this.friendRequestService.findAllSent(user)) ?? [];
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.FIND_ALL_RECEIVED)
  @UseInterceptors(FindAllFriendRequest)
  async findAllReceived(@UserContext() user: UserContextType) {
    return (await this.friendRequestService.findAllReceived(user)) ?? [];
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.FIND_BY_ID)
  @UseInterceptors(FindFriendRequest)
  async findOneRequestFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendRequestService.findOneRequestFriendWithUser(
      payload,
      user
    );
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.CREATE)
  request(
    @Payload() payload: { username: string },
    @UserContext() userContext: UserContextType
  ) {
    return this.friendRequestService.createFriendRequest(payload, userContext);
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.ACCEPT)
  async acceptFriendRequest(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendRequestService.acceptFriendRequest(payload, user);
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.REJECT)
  async rejectFriendRequest(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendRequestService.rejectFriendRequest(payload, user);
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.DELETE)
  async deleteFriendRequest(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.friendRequestService.deleteFriendRequest(payload, user);
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.CREATE)
  async newFriend(
    @Payload() payload: { user1: IdType; user2: IdType },
    @UserContext() userContext: UserContextType
  ) {
    return this.friendService.newFriend(payload, userContext);
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.FIND_ALL)
  @UseInterceptors(FindAllFriends)
  async findAllFriends(@UserContext() user: UserContextType) {
    return (await this.friendService.findAllFriends(user)) ?? [];
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.FIND_BY_ID)
  @UseInterceptors(FindFriend)
  async findFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return (await this.friendService.findFriendWithUser(payload, user)) ?? [];
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.IS_FRIEND)
  async isFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return (await this.friendService.isFriend(payload, user)) ?? [];
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.DELETE)
  async deleteFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.friendService.deleteFriend(payload, user);
  }
}
