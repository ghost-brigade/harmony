import { PrivateMessageNotification } from "@harmony/notification";
import { IdSchema, IdType, PrivateMessageType, UserType } from "@harmony/zod";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsAuthService } from "../ws-auth.service";
import { Injectable } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "private-message",
})
@Injectable()
export class PrivateMessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly wsAuthService: WsAuthService) {}

  user: UserType;

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket & { request: { user: UserType } }) {
    console.log(`Client ${client.id} connected.`);

    this.user = await this.wsAuthService.jwtLogin({
      client,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected.`);
  }

  private getRoomName(receiverId: IdType, userId?: IdType) {
    const name = [userId ? userId : this.user?.id, receiverId].sort();
    return name.join("-");
  }

  @SubscribeMessage(PrivateMessageNotification.LEAVE_ALL_ROOMS)
  async onLeaveAllRooms(
    @ConnectedSocket() client: Socket & { request: { user: UserType } }
  ) {
    client.rooms.forEach((room) => {
      if (room !== client.id) {
        client.leave(room);
      }
    });
  }

  @SubscribeMessage(PrivateMessageNotification.JOIN_RECEIVER)
  async onJoinReceiver(
    @ConnectedSocket() client: Socket & { request: { user: UserType } },
    @MessageBody() receiverId: IdType
  ) {
    console.log("join", receiverId);
    try {
      IdSchema.parse(receiverId);
    } catch (error) {
      client.emit("error", { message: "Invalid channel id" });
      client.disconnect();
      return;
    }

    await this.onLeaveAllRooms(client);
    await client.join(this.getRoomName(receiverId));
  }

  @SubscribeMessage(PrivateMessageNotification.NEW_MESSAGE)
  onNewMessage({ message }: { message: any }) {
    try {
      // if (message.author === this.user.id) {
      //   return true;
      // }
      this.server
        .to(this.getRoomName(message.receiver.id, message.author.id))
        .emit(PrivateMessageNotification.NEW_MESSAGE, message);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(PrivateMessageNotification.UPDATE_MESSAGE)
  onUpdateMessage({ message }: { message: any }) {
    try {
      // if (message.author === this.user.id) {
      //   return true;
      // }

      this.server
        .to(this.getRoomName(message.receiver, message.author))
        .emit(PrivateMessageNotification.UPDATE_MESSAGE, message);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(PrivateMessageNotification.DELETE_MESSAGE)
  onDeleteMessage({
    authorId,
    receiverId,
    messageId,
  }: {
    authorId: IdType;
    receiverId: IdType;
    messageId: IdType;
  }) {
    try {
      // if (this.user.id !== receiverId) {
      //   return true;
      // }

      this.server
        .to(this.getRoomName(receiverId, authorId))
        .emit(PrivateMessageNotification.DELETE_MESSAGE, messageId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
