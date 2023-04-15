import { AuthenticationService } from './authentication.service';
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get("login")
  async login() {
    return await this.authenticationService.login();
  }
}
