import { MessageNotification } from "@harmony/notification";
import {
  CHANNEL_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { IdType, UserType, ChannelType } from "@harmony/zod";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Socket } from "socket.io";

type VoiceType = {
  channelId: IdType;
  socketId: string;
  user: UserType;
  offer?: string;
  answer?: string;
};

@Injectable()
export class MessageService {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly clientServer: ClientProxy
  ) {}

  private async isUserAlreadyInChannel({
    channelId,
    userId,
    voices,
  }: {
    channelId: IdType;
    userId: IdType;
    voices: VoiceType[];
  }) {
    const voice = voices.find(
      (voice) => voice.channelId === channelId && voice.user.id === userId
    );
    return voice ? true : false;
  }

  private async isOfferAlreadyInChannel({
    channelId,
    offer,
    voices,
  }: {
    channelId: IdType;
    offer: string;
    voices: VoiceType[];
  }) {
    const voice = voices.find(
      (voice) => voice.channelId === channelId && voice.offer === offer
    );
    return voice ? true : false;
  }

  async joinVoiceChannel({
    client,
    channelId,
    user,
    offer,
    voices,
  }: {
    client: Socket & { request: { user: UserType } };
    channelId: IdType;
    user: UserType;
    offer: string;
    voices: VoiceType[];
  }) {
    if (!offer) {
      client.emit(MessageNotification.ERROR, {
        message: "Invalid payload offer is required",
      });
      client.disconnect();
      return;
    }

    if (
      await this.isUserAlreadyInChannel({ channelId, userId: user.id, voices })
    ) {
      client.emit(MessageNotification.ERROR, {
        message: "User already in channel",
      });
      client.disconnect();
      return;
    }

    if (await this.isOfferAlreadyInChannel({ channelId, offer, voices })) {
      client.emit(MessageNotification.ERROR, {
        message: "Offer already in channel",
      });
      client.disconnect();
      return;
    }

    const response = {
      socketId: client.id,
      channelId: channelId,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      },
      offer: offer,
    };
    await client.join(channelId);

    client.to(channelId).emit(MessageNotification.VOICE_JOIN, response);

    voices.push(response);
    return;
  }

  async getChannel({
    channelId,
    user,
  }: {
    channelId: IdType;
    user: UserType;
  }): Promise<ChannelType> {
    try {
      return await firstValueFrom(
        this.clientServer.send(CHANNEL_MESSAGE_PATTERN.GET_BY_ID, {
          id: channelId,
          _user: user,
        })
      );
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }

  async getChannelType({ channelId, user }): Promise<string> {
    try {
      const channel = await this.getChannel({ channelId, user });
      return channel.type;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }
}
