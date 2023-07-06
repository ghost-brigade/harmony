import { NOTIFICATION_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller, Get } from "@nestjs/common";
import { MessageGateway } from "./private-message.gateway";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { IdType, MessageType } from "@harmony/zod";

@Controller()
export class PrivateMessageController {
  constructor(private readonly messageGateway: MessageGateway) {}

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.NEW_PRIVATE_MESSAGE)
  async newMessage(
    @Payload() payload: { message: MessageType }
  ): Promise<boolean> {
    console.log("newMessage", payload);
    return this.messageGateway.onNewMessage({
      channelId: payload.message.channel,
      message: payload.message,
    });
  }

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.UPDATE_PRIVATE_MESSAGE)
  async updateMessage(@Payload() payload: { message: MessageType }) {
    return this.messageGateway.onUpdateMessage({
      channelId: payload.message.channel,
      message: payload.message,
    });
  }

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.DELETE_PRIVATE_MESSAGE)
  async deleteMessage(
    @Payload() payload: { messageId: IdType; channelId: IdType }
  ) {
    return this.messageGateway.onDeleteMessage({
      channelId: payload.channelId,
      messageId: payload.messageId,
    });
  }
}
