import { PrivateMessageNotification } from "@harmony/notification";
import {
  IdSchema,
  IdType,
  MessageType,
  PrivateMessageType,
  UserType,
} from "@harmony/zod";
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
import { PrivateMessageAuthorizationService } from "./private-message-authorization.service";

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
  constructor(
    private readonly messageAuthorizationService: PrivateMessageAuthorizationService,
    private readonly wsAuthService: WsAuthService
  ) {}

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

  private getRoomName(receiverId: IdType) {
    return `${receiverId}`;
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
    try {
      IdSchema.parse(receiverId);
    } catch (error) {
      client.emit("error", { message: "Invalid channel id" });
      client.disconnect();
      return;
    }

    const isAuthorized =
      await this.messageAuthorizationService.canAccessChannel({
        channelId,
        user: this.user as UserType,
      });

    if (isAuthorized) {
      console.log("join", channelId);

      await this.onLeaveAllRooms(client);
      await client.join(this.getRoomName(channelId));
    } else {
      client.emit("error", {
        message: "You are not authorized to join this channel",
      });

      client.disconnect();
    }
  }

  @SubscribeMessage(PrivateMessageNotification.NEW_MESSAGE)
  onNewMessage({
    receiverId,
    message,
  }: {
    receiverId: IdType;
    message: PrivateMessageType;
  }) {
    try {
      this.server
        .to(this.getRoomName(receiverId))
        .emit(PrivateMessageNotification.NEW_MESSAGE, message);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(PrivateMessageNotification.UPDATE_MESSAGE)
  onUpdateMessage({
    receiverId,
    message,
  }: {
    receiverId: IdType;
    message: MessageType;
  }) {
    try {
      this.server
        .to(this.getRoomName(receiverId))
        .emit(PrivateMessageNotification.UPDATE_MESSAGE, message);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(PrivateMessageNotification.DELETE_MESSAGE)
  onDeleteMessage({
    receiverId,
    messageId,
  }: {
    receiverId: IdType;
    messageId: IdType;
  }) {
    try {
      this.server
        .to(this.getRoomName(receiverId))
        .emit(PrivateMessageNotification.DELETE_MESSAGE, messageId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
