import { ServiceRequest } from "@harmony/nest-microservice";
import {
  PRIVATE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { PrivateMessageDto, PrivateMessageCreateDto } from "@harmony/zod";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";

// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Controller("private-message")
@ApiTags("Private Message")
export class PrivateMessageController {
  constructor(
    @Inject(getServiceProperty(Services.PRIVATE_MESSAGE, "name"))
    private readonly clientPrivateMessage: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @Get("user")
  @HttpCode(200)
  @ApiOperation({
    summary: "Get all conversations of user",
    description: "Get all conversations of user",
  })
  async getAll(): Promise<any> {
    console.log("getAll");
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: PRIVATE_MESSAGE_PATTERN.FIND_ALL,
    });
  }

  @Get("user/:userId")
  @HttpCode(200)
  @ApiOperation({
    summary: "Get messages between the user and a specific recipient",
    description: "Get messages between the user and a specific recipient",
  })
  @ApiParam({ name: "userId", description: "ID of the recipient user" })
  async getMessagesWithUser(
    @Param("userId") userId: string,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1
  ): Promise<any> {
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: PRIVATE_MESSAGE_PATTERN.FIND_MESSAGES_WITH_USER,
      data: { userId, params: { limit, page } },
    });
  }

  @Post("user/:receiverId")
  @HttpCode(201)
  @ApiOperation({
    summary: "Create a new private message",
    description: "Create a new private message",
  })
  @ApiCreatedResponse({
    description: "The private message has been successfully created.",
    type: PrivateMessageDto,
  })
  @ApiBadRequestResponse({
    description: "The provided data was invalid.",
  })
  @ApiUnauthorizedResponse({
    description: "The user is not authorized.",
  })
  @ApiBody({
    description: "The private message to create.",
    type: PrivateMessageCreateDto,
  })
  @UseInterceptors(FilesInterceptor("attachements[]", 3))
  async newMessage(
    @UploadedFiles() attachments: Multer[],
    @Body() privateMessage: PrivateMessageCreateDto,
    @Param("receiverId") receiverId: string
  ): Promise<PrivateMessageDto> {
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: PRIVATE_MESSAGE_PATTERN.CREATE,
      data: {
        message: { ...privateMessage, receiver: receiverId },
        attachments,
      },
    });
  }

  @Put(":messageId")
  @HttpCode(200)
  @ApiOperation({
    summary: "Update a private message",
    description: "Update a private message",
  })
  @ApiParam({ name: "messageId", description: "ID of the private message" })
  @ApiBody({ type: PrivateMessageDto })
  async updateMessage(
    @Param("messageId") messageId: string,
    @Body() privateMessage: PrivateMessageDto
  ): Promise<PrivateMessageDto> {
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: PRIVATE_MESSAGE_PATTERN.UPDATE,
      data: { messageId, privateMessage },
    });
  }

  @Delete(":messageId")
  @HttpCode(204)
  @ApiOperation({
    summary: "Delete a private message",
    description: "Delete a private message",
  })
  @ApiParam({ name: "messageId", description: "ID of the private message" })
  async deleteMessage(@Param("messageId") messageId: string): Promise<void> {
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: PRIVATE_MESSAGE_PATTERN.DELETE,
      data: { messageId },
    });
  }
}
