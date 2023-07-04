import { ServerNotification } from "@harmony/notification";
import { IdSchema, IdType, UserType, ChannelType } from "@harmony/zod";
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
import { ServerAuthorizationService } from "./server-authorization.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "server",
})
@Injectable()
export class ServerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly serverAuthorizationService: ServerAuthorizationService,
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

  private getRoomName(serverId: IdType) {
    return `server:${serverId}`;
  }

  @SubscribeMessage(ServerNotification.JOIN_CHANNEL)
  async onJoinChannel(
    @ConnectedSocket() client: Socket & { request: { user: UserType } },
    @MessageBody() serverId: IdType
  ) {
    try {
      IdSchema.parse(serverId);
    } catch (error) {
      client.emit("error", { message: "Invalid server id" });
      client.disconnect();
      return;
    }

    const isAuthorized = await this.serverAuthorizationService.canAccessServer({
      serverId,
      user: this.user as UserType,
    });

    if (isAuthorized) {
      console.log("join", serverId);
      await client.join(this.getRoomName(serverId));
    } else {
      client.emit("error", {
        message: "You are not authorized to join this channel",
      });

      client.disconnect();
    }
  }

  @SubscribeMessage(ServerNotification.NEW_CHANNEL)
  onNewChannel({
    serverId,
    channel,
  }: {
    serverId: IdType;
    channel: ChannelType;
  }) {
    try {
      this.server
        .to(this.getRoomName(serverId))
        .emit(ServerNotification.NEW_CHANNEL, channel);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(ServerNotification.UPDATE_CHANNEL)
  onUpdateChannel({
    serverId,
    channel,
  }: {
    serverId: IdType;
    channel: ChannelType;
  }) {
    try {
      this.server
        .to(this.getRoomName(serverId))
        .emit(ServerNotification.UPDATE_CHANNEL, channel);
      return true;
    } catch (error) {
      return false;
    }
  }

  @SubscribeMessage(ServerNotification.DELETE_CHANNEL)
  onDeleteChannel({
    serverId,
    channelId,
  }: {
    serverId: IdType;
    channelId: IdType;
  }) {
    try {
      this.server
        .to(this.getRoomName(serverId))
        .emit(ServerNotification.DELETE_CHANNEL, channelId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
