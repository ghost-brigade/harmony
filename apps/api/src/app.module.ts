import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./authentication/auth.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env?.RATE_LIMIT_TTL || '1'),
      limit: parseInt(process.env?.RATE_LIMIT_COUNT || '10'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    }
  ],
})

export class AppModule {}
