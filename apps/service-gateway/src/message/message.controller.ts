import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FRIENDREQUEST_MESSAGE_PATTERN,
  FRIEND_MESSAGE_PATTERN,
  MESSENGER_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FriendRequestCreateDto,
  FriendRequestDto,
  MessageCreateDto,
  FriendCreateDto,
  FriendDto,
  IdType,
  MessageDto,
} from "@harmony/zod";
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
  ApiParam,
} from "@nestjs/swagger";

// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Controller("message")
@ApiTags("Message")
export class MessageController {
  constructor(
    @Inject(getServiceProperty(Services.MESSAGE, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: "Create a new message",
    description: "Create a new message",
  })
  @ApiCreatedResponse({
    description: "The message has been successfully created.",
    type: MessageDto,
  })
  @ApiBadRequestResponse({
    description: "The provided data was invalid.",
  })
  @ApiUnauthorizedResponse({
    description: "The user is not authorized.",
  })
  @ApiBody({
    description: "The message to create.",
    type: MessageCreateDto,
  })
  async newMessage(@Body() message: MessageCreateDto): Promise<MessageDto> {
    return this.serviceRequest.send({
      client: this.client,
      pattern: MESSENGER_MESSAGE_PATTERN.CREATE,
      data: { message },
    });
  }

  @Get()
  @HttpCode(201)
  @ApiOperation({
    summary: "Find all messages",
    description: "Find all messages",
  })
  @ApiCreatedResponse({
    description: "The messages have been successfully found.",
    type: MessageDto,
  })
  @ApiBadRequestResponse({
    description: "The provided data was invalid.",
  })
  @ApiUnauthorizedResponse({
    description: "The user is not authorized.",
  })
  async findAll(): Promise<MessageDto> {
    return this.serviceRequest.send({
      client: this.client,
      pattern: MESSENGER_MESSAGE_PATTERN.FIND_ALL,
    });
  }
}

//6499a80ac15e8c1d6172c512