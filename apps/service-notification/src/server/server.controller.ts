import { NOTIFICATION_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { IdType, ChannelType } from "@harmony/zod";
import { ServerGateway } from "./server.gateway";

@Controller()
export class ServerController {
  constructor(private readonly serverGateway: ServerGateway) {}

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.NEW_CHANNEL)
  async createChannel(
    @Payload() payload: { channel: ChannelType }
  ): Promise<boolean> {
    return this.serverGateway.onNewChannel({
      serverId: payload.channel.server,
      channel: payload.channel,
    });
  }

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.UPDATE_CHANNEL)
  async updateChannel(@Payload() payload: { channel: ChannelType }) {
    return this.serverGateway.onUpdateChannel({
      serverId: payload.channel.server,
      channel: payload.channel,
    });
  }

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.DELETE_CHANNEL)
  async deleteChannel(
    @Payload() payload: { channelId: IdType; serverId: IdType }
  ) {
    return this.serverGateway.onDeleteChannel({
      serverId: payload.serverId,
      channelId: payload.channelId,
    });
  }
}
