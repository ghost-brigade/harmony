import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FRIENDREQUEST_MESSAGE_PATTERN,
  FRIEND_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { FriendRequestCreateDto, FriendRequestDto, FriendCreateDto, FriendDto, IdType } from "@harmony/zod";
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
  ApiBody,
  ApiParam
} from "@nestjs/swagger";

// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Controller("")
@ApiTags("Friendship")
export class FriendshipController {
  constructor(
    @Inject(getServiceProperty(Services.FRIENDSHIP, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Get all friendrequests" })
  @ApiOkResponse({ status: 200, description: "Return all friend requests" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("/friend-request")
  async findAll() {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDREQUEST_MESSAGE_PATTERN.FIND_ALL,
    });
  }



  @ApiOperation({ summary: "Find friend request by id" })
  @ApiOkResponse({
    status: 200,
    description: "Return friendrequest by id",
    type: FriendRequestCreateDto,
  })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("/friend-request/:id")
  async findById(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDREQUEST_MESSAGE_PATTERN.FIND_BY_ID,
      data: { id },
    });
  }
  

  @ApiOperation({ summary: "Send friend request" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBody({ type: FriendRequestCreateDto })
  @Post("/friend-request/send")
  async sendFriendRequest( @Body() data: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDREQUEST_MESSAGE_PATTERN.CREATE,
      data,
    });
  }


  @ApiOperation({ summary: "Accept friend request" })
  @ApiNoContentResponse({ status: 204, description: "FriendRequest accepted" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Post("/friend-request/accept/:id")
  async acceptFriendRequest(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDREQUEST_MESSAGE_PATTERN.ACCEPT,
      data: { friendrequestId: id },
    });
  }
  
  @ApiOperation({ summary: "Reject friend request" })
  @ApiNoContentResponse({ status: 204, description: "FriendRequest rejected" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Post("/friend-request/reject/:id")
  async rejectFriendRequest(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDREQUEST_MESSAGE_PATTERN.REJECT,
      data: { friendrequestId: id },
    });
  }

  @ApiOperation({ summary: "Cancel friend request" })
  @ApiNoContentResponse({ status: 204, description: "Return deleted friendrequest" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiParam({ name: "id", type: String })
  @HttpCode(204)
  @Delete("/friend-request/cancel/:id")
  async deleteFriendRequest(@Param("id") id: IdType, ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDREQUEST_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Create new friend" })
  @ApiBody({ type: FriendCreateDto })
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

  @ApiOperation({ summary: "Get one friend" })
  @ApiOkResponse({ status: 200, description: "Return one friend", type: FriendCreateDto })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiParam({ name: "id", type: String })
  @Get("/friend/:id")
  async findFriend(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIEND_MESSAGE_PATTERN.FIND_BY_ID,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Delete friend" })
  @ApiNoContentResponse({ status: 204, description: "Return deleted friend" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @ApiParam({ name: "id", type: String })
  @Delete("/friend/delete/:id")
  async deleteFriend(@Param("id") id: IdType, ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIEND_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }
}
