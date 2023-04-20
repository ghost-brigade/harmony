import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AccountModule } from "./account/account.module";
import { ServerModule } from "./server/server.module";

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
    ServerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: "GATEWAY_GUARD",
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class GatewayModule {}
