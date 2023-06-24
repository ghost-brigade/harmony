import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FRIENDSHIP_MESSAGE_PATTERN,
  FRIEND_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { FriendshipCreateDto, FriendshipDto, FriendCreateDto, FriendDto, IdType } from "@harmony/zod";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBody
} from "@nestjs/swagger";

// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Controller("friendship")
@ApiTags("Friendship")
export class FriendshipController {
  constructor(
    @Inject(getServiceProperty(Services.FRIENDSHIP, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Get all friendships" })
  @ApiOkResponse({ status: 200, description: "Return all friendships" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get()
  async findAll() {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.FIND_ALL,
    });
  }

  @ApiOperation({ summary: "Get all friends" })
  @ApiOkResponse({ status: 200, description: "Return all friends" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("/friends")
  async findAllFriends() {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIEND_MESSAGE_PATTERN.FIND_ALL,
    });
  }

  @ApiOperation({ summary: "Find friendship by id" })
  @ApiOkResponse({
    status: 200,
    description: "Return friendship by id",
    type: FriendshipCreateDto,
  })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.FIND_BY_ID,
      data: { id },
    });
  }

  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBody({ type: FriendshipCreateDto })
  @Post("/request")
  async sendFriendRequest( @Body() data: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.CREATE,
      data,
    });
  }

  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post("/newFriend")
  async newFriend( @Body() data: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIEND_MESSAGE_PATTERN.CREATE,
      data,
    });
  }

  @ApiOperation({ summary: "Accept friendship request" })
  @ApiNoContentResponse({ status: 204, description: "Friendship request accepted" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Post(":id/accept")
  async acceptFriendRequest(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.ACCEPT,
      data: { friendshipId: id },
    });
  }
  
  @ApiOperation({ summary: "Reject friendship request" })
  @ApiNoContentResponse({ status: 204, description: "Friendship request rejected" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Post("/reject/:id")
  async rejectFriendRequest(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.REJECT,
      data: { friendshipId: id },
    });
  }

  @ApiOperation({ summary: "Delete friendship" })
  @ApiNoContentResponse({ status: 204, description: "Return deleted friendship" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Delete(":id")
  async deleteFriendship(@Param("id") id: IdType, ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }
}
