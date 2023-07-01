import { ServiceRequest } from "@harmony/nest-microservice";
import {
  MESSENGER_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { MessageCreateDto, MessageDto, MessageUpdateDto } from "@harmony/zod";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  @HttpCode(200)
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

  @Get(":id")
  @HttpCode(200)
  @ApiOperation({
    summary: "Find a message",
    description: "Find a message",
  })
  @ApiCreatedResponse({
    description: "The message have been successfully found.",
    type: MessageDto,
  })
  @ApiBadRequestResponse({
    description: "The provided data was invalid.",
  })
  @ApiUnauthorizedResponse({
    description: "The user is not authorized.",
  })
  @ApiParam({
    name: "id",
    description: "The id of the message to find.",
    type: String,
  })
  async findMessage(@Param("id") id: string): Promise<MessageDto> {
    return this.serviceRequest.send({
      client: this.client,
      pattern: MESSENGER_MESSAGE_PATTERN.FIND_BY_ID,
      data: { id },
    });
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({
    summary: "Delete a message",
    description: "Delete a message",
  })
  @ApiCreatedResponse({
    description: "The message have been successfully found.",
    type: MessageDto,
  })
  @ApiBadRequestResponse({
    description: "The provided data was invalid.",
  })
  @ApiUnauthorizedResponse({
    description: "The user is not authorized.",
  })
  @ApiParam({
    name: "id",
    description: "The id of the message to Delete.",
    type: String,
  })
  async deleteMessage(@Param("id") id: string): Promise<boolean> {
    return this.serviceRequest.send({
      client: this.client,
      pattern: MESSENGER_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }

  @Put(":id")
  @HttpCode(200)
  @ApiOperation({
    summary: "Delete a message",
    description: "Delete a message",
  })
  @ApiCreatedResponse({
    description: "The message have been successfully found.",
    type: MessageDto,
  })
  @ApiBadRequestResponse({
    description: "The provided data was invalid.",
  })
  @ApiUnauthorizedResponse({
    description: "The user is not authorized.",
  })
  @ApiBody({
    description: "The message to update.",
    type: MessageCreateDto,
  })
  @ApiParam({
    name: "id",
    description: "The id of the message to Update.",
    type: String,
  })
  async updateMessage(
    @Body() updateMessageDto: MessageUpdateDto,
    @Param("id") id: string
  ): Promise<MessageUpdateDto> {
    return this.serviceRequest.send({
      client: this.client,
      pattern: MESSENGER_MESSAGE_PATTERN.UPDATE,
      data: { content: updateMessageDto, id },
    });
  }
}
