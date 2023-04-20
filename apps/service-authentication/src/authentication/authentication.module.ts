import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { LocalStrategy } from "../strategies/local.strategy";
import { jwtConstants } from '../constants/jwt.constants';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ClientsModule } from '@nestjs/microservices';
import { Services, getService } from '@harmony/service-config';

@Module({
    imports: [
        ClientsModule.register([getService(Services.ACCOUNT)]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
    ],
    providers: [AuthenticationService, JwtStrategy, LocalStrategy],
    controllers: [AuthenticationController],
    exports: []
})
export class AuthenticationModule { }
