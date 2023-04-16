import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { getServiceName, servicesEnum } from "@harmony/service-config";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceName(servicesEnum.AUTHENTICATION)) private readonly client: ClientProxy
  ) {}

  async login() {
    return this.client.send("login", {});
  }
}
