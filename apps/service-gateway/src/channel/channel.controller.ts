import { ServiceRequest } from "@harmony/nest-microservice";
import {
  CHANNEL_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  IdType,
  ChannelCreateType,
  ChannelUpdateType,
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
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("channel")
@ApiTags("Channel")
export class ChannelController {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Get all channels for a server" })
  @ApiResponse({
    status: 200,
    description: "Return all channels for a server",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get("server/:id")
  async findAllChannelsForServer(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: CHANNEL_MESSAGE_PATTERN.GET_ALL_BY_SERVER_ID,
      data: { server: id },
    });
  }

  @ApiOperation({ summary: "Get a channel by id" })
  @ApiResponse({
    status: 200,
    description: "Return a channel by id",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get(":id")
  async find(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: CHANNEL_MESSAGE_PATTERN.GET_BY_ID,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Create a channel for a server" })
  @ApiResponse({
    status: 201,
    description: "The role has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  create(@Body() data: ChannelCreateType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: CHANNEL_MESSAGE_PATTERN.CREATE,
      data,
    });
  }

  @ApiOperation({ summary: "Delete a channel for a server" })
  @ApiResponse({
    status: 204,
    description: "The channel has been successfully deleted.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(204)
  @Delete(":id")
  async delete(@Param("id") id: IdType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: CHANNEL_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Update a channel for a server" })
  @ApiResponse({
    status: 200,
    description: "The channel has been successfully updated.",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Put(":id")
  async update(@Param("id") id: IdType, @Body() channel: ChannelUpdateType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: CHANNEL_MESSAGE_PATTERN.UPDATE,
      data: Object.assign(channel, { id }),
    });
  }
}
