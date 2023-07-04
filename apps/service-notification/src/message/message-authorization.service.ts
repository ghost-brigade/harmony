import {
  CHANNEL_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { IdType, UserType } from "@harmony/zod";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class MessageAuthorizationService {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly clientServer: ClientProxy
  ) {}

  async canAccessChannel({
    channelId,
    user,
  }: {
    channelId: IdType;
    user: UserType;
  }) {
    try {
      const channel = await firstValueFrom(
        this.clientServer.send(CHANNEL_MESSAGE_PATTERN.GET_BY_ID, {
          id: channelId,
          _user: user,
        })
      );

      return channel ? true : false;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
}
