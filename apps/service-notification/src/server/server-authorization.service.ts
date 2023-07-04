import {
  CHANNEL_MESSAGE_PATTERN,
  SERVER_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { IdType, UserType } from "@harmony/zod";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServerAuthorizationService {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly clientServer: ClientProxy
  ) {}

  async canAccessServer({
    serverId,
    user,
  }: {
    serverId: IdType;
    user: UserType;
  }) {
    try {
      const server = await firstValueFrom(
        this.clientServer.send(SERVER_MESSAGE_PATTERN.GET_BY_ID, {
          id: serverId,
          _user: user,
        })
      );

      return server ? true : false;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
}
