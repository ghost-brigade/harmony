import {
  AUTHENTICATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { UserType } from "@harmony/zod";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { Socket } from "socket.io";

@Injectable()
export class WsAuthService {
  constructor(
    @Inject(getServiceProperty(Services.AUTHENTICATION, "name"))
    private readonly client: ClientProxy
  ) {}

  async jwtLogin({
    client,
  }: {
    client: Socket & { request: { user: UserType } };
  }): Promise<UserType> {
    const token = client.handshake.auth.token;

    if (!token || token === undefined || token === null) {
      client.emit("unauthorized", { message: "No token provided" });
      client.disconnect();
    }

    try {
      const payload = await firstValueFrom(
        this.client.send(AUTHENTICATION_MESSAGE_PATTERN.JWT_LOGIN, token)
      );

      client.request.user = payload;
      return payload;
    } catch {
      client.emit("unauthorized", { message: "Invalid token" });
      client.disconnect();
    }
  }
}
