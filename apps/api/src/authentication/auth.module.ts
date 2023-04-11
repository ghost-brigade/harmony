import { Module } from '@nestjs/common';
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { jwtConstants } from './constants/jwt.constants';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),

    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
