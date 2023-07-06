import { GlobalNotification, ServerNotification } from "@harmony/notification";
import {
  IdSchema,
  IdType,
  UserType,
  ChannelType,
  ServerType,
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
import { NOTIFICATION_MESSAGE_PATTERN } from "@harmony/service-config";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "global",
})
@Injectable()
export class GlobalGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
    // change user status to offline if user is not connected to any server
    console.log(`Client ${client.id} disconnected.`);
  }

  private getRoomName(userId: IdType) {
    return userId;
  }

  @SubscribeMessage(GlobalNotification.JOIN_CHANNEL)
  async onJoinChannel(
    @ConnectedSocket() client: Socket & { request: { user: UserType } },
    @MessageBody() userId: IdType
  ) {
    try {
      IdSchema.parse(userId);
    } catch (error) {
      client.emit(NOTIFICATION_MESSAGE_PATTERN.ERROR, {
        message: "Invalid user id",
      });
      client.disconnect();
      return;
    }

    if (userId !== client.request.user.id) {
      client.emit(NOTIFICATION_MESSAGE_PATTERN.ERROR, {
        message: "You are not authorized to join this channel",
      });
      client.disconnect();
      return;
    }

    // update user status with redis

    await client.join(this.getRoomName(userId));
  }

  @SubscribeMessage(GlobalNotification.NEW_MESSAGE_ON_SERVER)
  async onNewMessage({ server, channelId }: { server: ServerType, channelId: IdType }) {
    server.members.forEach((userId: IdType) => {
      this.server
        .to(this.getRoomName(userId))
        .emit(NOTIFICATION_MESSAGE_PATTERN.NEW_SERVER_MESSAGE, {
          serverId: server.id,
        });
    });

    this.server
      .to(this.getRoomName(server.owner))
      .emit(NOTIFICATION_MESSAGE_PATTERN.NEW_SERVER_MESSAGE, {
        serverId: server.id,
      });

    return;
  }

  // friend request
  // friend
  // new message on server
}
