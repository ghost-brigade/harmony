import { Controller, Get } from "@nestjs/common";

import { FriendshipService } from "./friendship.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FRIENDSHIP_MESSAGE_PATTERN } from "@harmony/service-config";
import { FriendshipParamsType, IdType, UserContextType } from "@harmony/zod";
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


  @MessagePattern( FRIENDSHIP_MESSAGE_PATTERN.CREATE )
  request(@Payload() payload: {receiver: IdType}, @UserContext() userContext: UserContextType)
  {
    return this.friendshipService.createFriendship(payload, userContext);
  }

}
