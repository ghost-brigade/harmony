import { AuthenticationService } from "./authentication.service";
import { Controller, Get, Post } from "@nestjs/common";
@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get("login")
  async login() {
    return await this.authenticationService.login();
  }
}
