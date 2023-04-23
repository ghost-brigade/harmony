import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AccountModule } from "./account/account.module";
import { JwtAuthGuard } from './core/guards/passport/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env?.RATE_LIMIT_TTL || "1"),
      limit: parseInt(process.env?.RATE_LIMIT_COUNT || "10"),
    }),
    AuthenticationModule,
    AccountModule,
  ],
  providers: [
    {
      provide: "APP_GUARD",
      useClass: JwtAuthGuard
    },
    {
      provide: "APP_GUARD",
      useClass: ThrottlerGuard,
    },
  ],
})
export class GatewayModule {}
