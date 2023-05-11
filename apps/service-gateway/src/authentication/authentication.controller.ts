import { LoginDto } from "@harmony/zod";
import { AuthenticationService } from "./authentication.service";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Public } from "../core/decorators/public.decorator";
import { Throttle } from "@nestjs/throttler";
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOkResponse({
    description: "JWT token",
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: "Bad credentials",
  })
  @Post("login")
  @Throttle(5, 300)
  @Public()
  login(@Body() loginType: LoginDto) {
    return this.authenticationService.login(loginType);
  }
}
