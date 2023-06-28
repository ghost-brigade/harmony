import { Controller, Get } from "@nestjs/common";

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

@Controller()
export class FriendshipController {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private readonly friendService: FriendService
  ) {}

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.FIND_ALL)
  async findAll(
    @Payload() payload: { params: FriendRequestParamsType },
    @UserContext() user: UserContextType
  ) {
    return (await this.friendRequestService.findAll(payload, user)) ?? [];
  }

  @MessagePattern(FRIENDREQUEST_MESSAGE_PATTERN.FIND_BY_ID)
  async findOneRequestFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendRequestService.findOneRequestFriend(
      payload.id,
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
  async findAllFriends(
    @Payload() payload: { params: FriendParamsType },
    @UserContext() user: UserContextType
  ) {
    return (await this.friendService.findAllFriends(payload, user)) ?? [];
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.FIND_BY_ID)
  async findFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return (await this.friendService.findFriend(payload, user)) ?? [];
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.DELETE)
  async deleteFriend(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.friendService.deleteFriend(payload, user);
  }
}
