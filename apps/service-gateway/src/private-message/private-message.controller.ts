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

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: "Get all messages",
    description: "Get all messages",
  })
  async getAll(): Promise<any> {
    console.log("getAll");
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: "abc",
    });
  }

  @Post()
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
  async newMessage(
    @Body() privateMessage: PrivateMessageCreateDto
  ): Promise<PrivateMessageDto> {
    return this.serviceRequest.send({
      client: this.clientPrivateMessage,
      pattern: PRIVATE_MESSAGE_PATTERN.CREATE,
      data: { privateMessage },
    });
  }
}
