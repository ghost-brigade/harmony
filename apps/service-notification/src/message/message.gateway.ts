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
import { ChannelType as ChannelTypeEnum } from "@harmony/enums";
import { MessageService } from "./message.service";

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
    //private readonly messageAuthorizationService: MessageAuthorizationService,
    private readonly messageService: MessageService,
    private readonly wsAuthService: WsAuthService
  ) {}

  private user: UserType;
  //private activeSockets: { room: string; id: string }[] = [];
  private voices: { channelId: string; socketId: string; user: UserType }[] =
    [];

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket & { request: { user: UserType } }) {
    console.log(`Client ${client.id} connected.`);
    this.user = await this.wsAuthService.jwtLogin({
      client,
    });
  }

  async handleDisconnect(client: Socket & { request: { user: UserType } }) {
    console.log(`Client ${client.id} disconnected.`);
    await this.onVoiceLeave(client);
  }

  private getRoomName(channelId: IdType) {
    return channelId;
  }

  @SubscribeMessage(MessageNotification.LEAVE_ALL_ROOMS)
  async onLeaveAllRooms(
    @ConnectedSocket() client: Socket & { request: { user: UserType } }
  ) {
    await this.onVoiceLeave(client);

    client.rooms.forEach((room) => {
      if (room !== client.id) {
        client.leave(room);
      }
    });
  }

  @SubscribeMessage(MessageNotification.VOICE_LEAVE)
  async onVoiceLeave(
    @ConnectedSocket() client: Socket & { request: { user: UserType } }
  ) {
    const voiceIndex = this.voices.findIndex(
      (voice) => voice.socketId === client.id
    );

    if (voiceIndex !== -1) {
      console.log("onVoiceLeave", this.voices[voiceIndex]);

      this.server
        .to(this.getRoomName(this.voices[voiceIndex].channelId))
        .emit(MessageNotification.VOICE_LEAVE, this.voices[voiceIndex].user.id);

      // client.broadcast.emit(MessageNotification.VOICE_LEAVE, {
      //   socketId: client.id,
      //   channelId: this.voices[voiceIndex].channelId,
      //   user: this.voices[voiceIndex].user,
      // });

      this.voices.splice(voiceIndex, 1);
    }
  }

  @SubscribeMessage(MessageNotification.JOIN_CHANNEL)
  async onJoinChannel(
    @ConnectedSocket() client: Socket & { request: { user: UserType } },
    @MessageBody() payload: { channelId?: IdType; offer?: string }
  ) {
    if (!payload.channelId) {
      client.emit(MessageNotification.ERROR, {
        message: "Invalid payload channelId is required",
      });
      client.disconnect();
      return;
    }

    try {
      IdSchema.parse(payload.channelId);
    } catch (error) {
      client.emit(MessageNotification.ERROR, {
        message: "Invalid channel id",
      });
      client.disconnect();
      return;
    }

    const channel = await this.messageService.getChannel({
      channelId: payload.channelId,
      user: this.user,
    });

    if (channel === null) {
      client.emit(MessageNotification.ERROR, {
        message: "You are not authorized to join this channel",
      });
      client.disconnect();
      return;
    }

    switch (channel.type) {
      case ChannelTypeEnum.VOICE:
        client.join(this.getRoomName(payload.channelId));

        const response = {
          socketId: client.id,
          channelId: payload.channelId,
          user: {
            id: this.user.id,
            username: this.user.username,
            avatar: this.user.avatar,
          },
        };

        const voiceIndex = this.voices.findIndex(
          (voice) => voice.user.id === this.user.id
        );

        if (voiceIndex !== -1) {
          client.emit(MessageNotification.ERROR, {
            message: "You are already in a voice channel",
          });
          client.disconnect();
          return;
        }

        this.voices.push(response);
        await this.onUserList(client);

        console.log("response", this.voices);
        break;
      case ChannelTypeEnum.TEXT:
        await this.onLeaveAllRooms(client);
        await client.join(this.getRoomName(payload.channelId));
        break;
      default:
        client.emit("error", { message: "Invalid channel type" });
        client.disconnect();
    }
  }

  @SubscribeMessage(MessageNotification.USER_LIST)
  async onUserList(
    @ConnectedSocket() client: Socket & { request: { user: UserType } }
  ) {
    const voiceIndex = this.voices.findIndex(
      (voice) => voice.socketId === client.id
    );

    this.server
      .to(this.getRoomName(this.voices[voiceIndex].channelId))
      .emit(
        MessageNotification.USER_LIST,
        this.voices.map((voice) => voice.user.id)
      );
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
    try {
      this.server
        .to(this.getRoomName(channelId))
        .emit(MessageNotification.UPDATE_MESSAGE, message);
      return true;
    } catch (error) {
      return false;
    }
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
