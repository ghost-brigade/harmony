import { MessageNotification } from "@harmony/notification";
import { NOTIFICATION_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MessageType } from "@harmony/zod";

@Controller()
export class MessageController {
  constructor(private readonly messageGateway: MessageGateway) {}

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.NEW_MESSAGE)
  async newMessage(@Payload() payload: { message: MessageType }) {
    this.messageGateway.newMessage({
      channelId: payload.message.channel,
      message: payload.message,
    });
  }
}
