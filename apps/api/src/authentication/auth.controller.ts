import { Controller, Post, UseGuards, Body, Get, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../core/guards/passport/jwt-auth.guard';
import { loginType } from "@harmony/zod";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginType: loginType) {
      return this.authService.login(loginType.email, loginType.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
