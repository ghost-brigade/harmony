import { CHANNEL_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ChannelService } from "./channel.service";
import { UserContext } from "@harmony/nest-microservice";
import {
  UserContextType,
  ChannelCreateType,
  ChannelUpdateType,
  IdType,
} from "@harmony/zod";

@Controller("channel")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.GET_ALL_BY_SERVER_ID)
  async getAllByServerId(
    @Payload() payload: { serverId: IdType },
    @UserContext() user: UserContextType
  ) {
    return this.channelService.getAllByServerId(payload, user);
  }

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.GET_BY_ID)
  async getById(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType,
    authorization: boolean = true
  ) {
    return this.channelService.getById(payload, user, authorization);
  }

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.GET_BY_IDS)
  async findAllByIds(@Payload() payload: { ids: IdType[] }) {
    return await this.channelService.getAllByIds(payload);
  }

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.CREATE)
  async create(
    @Payload() payload: { channel: ChannelCreateType },
    @UserContext() user: UserContextType
  ) {
    return await this.channelService.create(payload, user);
  }

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.UPDATE)
  async update(
    @Payload() payload: { id: IdType; channel: ChannelUpdateType },
    @UserContext() user: UserContextType
  ) {
    return this.channelService.update(payload, user);
  }

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.DELETE)
  async delete(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType,
    authorization: boolean = true
  ) {
    return this.channelService.delete(payload, user, authorization);
  }

  @MessagePattern(CHANNEL_MESSAGE_PATTERN.DELETE_BY_SERVER_ID)
  async deleteByServerId(
    @Payload() payload: { serverId: IdType },
    @UserContext() user: UserContextType,
    authorization: boolean = true
  ) {
    return this.channelService.deleteByServerId(payload, user, authorization);
  }
}
