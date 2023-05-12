import { AUTHENTICATION_MESSAGE_PATTERN } from '@harmony/service-config';
import { Controller } from '@nestjs/common';
import { LoginType } from "@harmony/zod";
import { AuthenticationService } from './authentication.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @MessagePattern(AUTHENTICATION_MESSAGE_PATTERN.LOGIN)
    login(loginType: LoginType) {
      return this.authenticationService.login(loginType);
    }

    @MessagePattern(AUTHENTICATION_MESSAGE_PATTERN.JWT_LOGIN)
    JwtLogin(access_token: string) {
      return this.authenticationService.JwtLogin(access_token);
    }
}
