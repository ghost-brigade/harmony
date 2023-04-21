import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { serverSchema } from "@harmony/zod";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [],
})
export class ServerModule {}
