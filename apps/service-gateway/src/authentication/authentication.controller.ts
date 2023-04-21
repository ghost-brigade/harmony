import { loginType } from "@harmony/zod";
import { AuthenticationService } from "./authentication.service";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOkResponse({
    description: "User found",
  })
  @ApiUnauthorizedResponse({
    description: "Bad credentials",
  })
  @Post("login")
  signIn(@Body() loginType: loginType) {
    return this.authenticationService.login(loginType);
  }
}
