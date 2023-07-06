import { NOTIFICATION_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller } from "@nestjs/common";
import { PrivateMessageGateway } from "./private-message.gateway";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { IdType, PrivateMessageType } from "@harmony/zod";

@Controller()
export class PrivateMessageController {
  constructor(private readonly privateMessageGateway: PrivateMessageGateway) {}

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.NEW_PRIVATE_MESSAGE)
  async newMessage(
    @Payload() payload: { message: PrivateMessageType }
  ): Promise<boolean> {
    console.log("newMessage", payload);
    return this.privateMessageGateway.onNewMessage({
      receiverId: payload.message.receiver,
      message: payload.message,
    });
  }

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.UPDATE_PRIVATE_MESSAGE)
  async updateMessage(@Payload() payload: { message: PrivateMessageType }) {
    return this.privateMessageGateway.onUpdateMessage({
      receiverId: payload.message.receiver,
      message: payload.message,
    });
  }

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.DELETE_PRIVATE_MESSAGE)
  async deleteMessage(
    @Payload() payload: { messageId: IdType; receiverId: IdType }
  ) {
    return this.privateMessageGateway.onDeleteMessage({
      receiverId: payload.receiverId,
      messageId: payload.messageId,
    });
  }
}
