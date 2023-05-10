import { LoginDto, loginSchema, loginType, userSchema } from "@harmony/zod";
import { AuthenticationService } from "./authentication.service";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Public } from "../core/decorators/public.decorator";
import { Throttle } from "@nestjs/throttler";
import { ZodValidationPipe } from "nestjs-zod";
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOkResponse({
    description: "JWT token",
    type: String
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
