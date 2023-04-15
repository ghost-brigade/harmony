import { AuthenticationService } from "./authentication.service";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ConfigService } from '@harmony/config';
@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private configService: ConfigService
  ) {}

  @Get("login")
  async login() {
    return await this.authenticationService.login();
  }
}
