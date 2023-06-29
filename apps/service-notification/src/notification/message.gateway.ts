import { MessageNotification } from "@harmony/notification";
import { MessageType } from "@harmony/zod";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(MessageNotification.NEW_MESSAGE)
  newMessage({
    channelId,
    message,
  }: {
    channelId: string;
    message: MessageType;
  }) {
    this.server.to(channelId).emit(MessageNotification.NEW_MESSAGE, message);
  }
}
