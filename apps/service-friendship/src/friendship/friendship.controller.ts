import { Controller, Get } from "@nestjs/common";

import { FriendshipService } from "./friendship.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FRIENDSHIP_MESSAGE_PATTERN, FRIEND_MESSAGE_PATTERN } from "@harmony/service-config";
import { FriendParamsType, FriendshipParamsType, IdType, UserContextType } from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @MessagePattern(FRIENDSHIP_MESSAGE_PATTERN.FIND_ALL)
  async findAll(
    @Payload() payload: { params: FriendshipParamsType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendshipService.findAll(payload, user) ?? [];
  }

  @MessagePattern(FRIEND_MESSAGE_PATTERN.FIND_ALL)
  async findAllFriends(
    @Payload() payload: { params: FriendParamsType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendshipService.findAllFriends(payload, user) ?? [];
  }

  @MessagePattern(FRIENDSHIP_MESSAGE_PATTERN.FIND_BY_ID)
  async findOneRequestFriend(
    @Payload() payload: { id: IdType } ,
    @UserContext() user: UserContextType
    ) {
    return await this.friendshipService.findOneRequestFriend(payload.id, user);
  }


  @MessagePattern( FRIENDSHIP_MESSAGE_PATTERN.CREATE )
  request(@Payload() payload: {receiver: IdType}, @UserContext() userContext: UserContextType)
  {
    return this.friendshipService.createFriendship(payload, userContext);
  }

  @MessagePattern( FRIEND_MESSAGE_PATTERN.CREATE )
  async newFriend(@Payload() payload: {user1: IdType, user2: IdType}, @UserContext() userContext: UserContextType)
  {
    return this.friendshipService.newFriend(payload, userContext);
  }

  @MessagePattern(FRIENDSHIP_MESSAGE_PATTERN.ACCEPT)
  async acceptFriendRequest(
    @Payload() payload: { friendshipId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendshipService.acceptFriendRequest(payload, user);
  }  

  @MessagePattern(FRIENDSHIP_MESSAGE_PATTERN.REJECT)
  async rejectFriendRequest(
    @Payload() payload: { friendshipId: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.friendshipService.rejectFriendRequest(payload, user);
  }  

  @MessagePattern(FRIENDSHIP_MESSAGE_PATTERN.DELETE)
  async deleteFriendship(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ): Promise<boolean> {
    return await this.friendshipService.deleteFriendship(payload, user);
  }

}
