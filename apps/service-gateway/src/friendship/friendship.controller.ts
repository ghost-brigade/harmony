import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FRIENDSHIP_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { FriendshipCreateDto, FriendshipDto, IdType } from "@harmony/zod";
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

  @ApiOperation({ summary: "Get friendship by id" })
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
  @Post("/request")
  async sendFriendRequest(
    @Body() userId: IdType
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.CREATE,
      data: {
        receiver: userId,
      },
    });
  }


  @ApiOperation({ summary: "Get all friendships of a user" })
  @ApiOkResponse({ status: 200, description: "Return all friendships" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get()
  async findAllFriendships() {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.FIND_ALL,
      data: {
        userId: currentUserId,
      },
    });
  }

  @ApiOperation({ summary: "Delete friendship" })
  @ApiNoContentResponse({ status: 204, description: "Return deleted friendship" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FRIENDSHIP_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }
}
