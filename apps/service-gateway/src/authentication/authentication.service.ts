import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceProperty(Services.AUTHENTICATION, 'name')) private readonly client: ClientProxy
  ) {}

  async login() {
    return this.client.send("login", {});
  }
}
