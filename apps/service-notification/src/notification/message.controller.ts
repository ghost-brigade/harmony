import { NOTIFICATION_MESSAGE_PATTERN } from './../../../../libs/service-config/src/message-pattern/notification.enum';
import { Controller, Get } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MessageType } from '@harmony/zod';

@Controller()
export class MessageController {
  constructor(private readonly messageGateway: MessageGateway) {}

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.NEW_MESSAGE)
  async newMessage(@Payload() payload: {
    message: MessageType
  }) {
    const channelId = payload.message.channel
    this.messageGateway.server.to(channelId).emit("message", payload.message);
  }
}
