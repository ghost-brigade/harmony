import { MessageNotification } from "@harmony/notification";
import { IdSchema, IdType, MessageType, UserType } from "@harmony/zod";
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
import { MessageAuthorizationService } from "./message-authorization.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "message",
})
@Injectable()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageAuthorizationService: MessageAuthorizationService,
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

  private getRoomName(channelId: IdType) {
    return `channel:${channelId}`;
  }

  @SubscribeMessage(MessageNotification.JOIN_CHANNEL)
  async onJoinChannel(
    @ConnectedSocket() client: Socket & { request: { user: UserType } },
    @MessageBody() channelId: IdType
  ) {
    try {
      IdSchema.parse(channelId);
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
      await client.join(this.getRoomName(channelId));
    } else {
      client.emit("error", {
        message: "You are not authorized to join this channel",
      });

      client.disconnect();
    }
  }

  @SubscribeMessage(MessageNotification.NEW_MESSAGE)
  onNewMessage({
    channelId,
    message,
  }: {
    channelId: IdType;
    message: MessageType;
  }) {
    try {
      this.server
        .to(this.getRoomName(channelId))
        .emit(MessageNotification.NEW_MESSAGE, message);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(MessageNotification.UPDATE_MESSAGE)
  onUpdateMessage({
    channelId,
    message,
  }: {
    channelId: IdType;
    message: MessageType;
  }) {
    this.server
      .to(this.getRoomName(channelId))
      .emit(MessageNotification.UPDATE_MESSAGE, message);
  }

  @SubscribeMessage(MessageNotification.DELETE_MESSAGE)
  onDeleteMessage({
    channelId,
    messageId,
  }: {
    channelId: IdType;
    messageId: IdType;
  }) {
    try {
      this.server
        .to(this.getRoomName(channelId))
        .emit(MessageNotification.DELETE_MESSAGE, messageId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
