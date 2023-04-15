import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ConfigService } from "@harmony/config";

@Injectable()
export class AuthenticationService {
  constructor(
    private configService: ConfigService,
    @Inject("AUTHENTICATION_SERVICE") private readonly client: ClientProxy
  ) {}

  async login() {
    const config = this.configService;
    console.log(config);
    return this.client.send("login", {});
  }
}
