import { Controller, Post, UseGuards, Body, Get, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../core/guards/passport/jwt-auth.guard';
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
