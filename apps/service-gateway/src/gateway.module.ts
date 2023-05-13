import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./account/user.module";
import { ServerModule } from "./server/server.module";
import { JwtAuthGuard } from "./core/guards/passport/jwt-auth.guard";
import { GatewayErrorHandlerInterceptor } from "./core/interceptors/gateway-error-handler.interceptor";

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
    ServerModule,
    UserModule,
  ],
  providers: [
    {
      provide: "APP_GUARD",
      useClass: JwtAuthGuard,
    },
    {
      provide: process.env?.NODE_ENV === "development" ? "null" : "APP_GUARD",
      useClass: ThrottlerGuard,
    },
    {
      provide: "APP_INTERCEPTOR",
      useClass: GatewayErrorHandlerInterceptor,
    },
  ],
})
export class GatewayModule {}
