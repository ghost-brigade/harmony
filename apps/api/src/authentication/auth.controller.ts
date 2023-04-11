import { Controller, Post, UseGuards, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../core/guards/passport/jwt-auth.guard';
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: LoginDto): Promise<{ access_token: string }> {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
