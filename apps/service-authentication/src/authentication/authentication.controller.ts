import { Controller, Body } from '@nestjs/common';
import { loginType } from "@harmony/zod";
import { AuthenticationService } from './authentication.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @MessagePattern('login')
    login(loginType: loginType) {
      console.log(loginType);
      return this.authenticationService.login(loginType);
    }

    @MessagePattern('JwtLogin')
    JwtLogin(access_token: string) {
      return this.authenticationService.JwtLogin(access_token);
    }
}
