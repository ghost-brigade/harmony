import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChannelSchema } from "@harmony/nest-schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule } from "@nestjs/microservices";
import { Services, getService } from "@harmony/service-config";
import { ServerController } from "./server/server.controller";
import { ServerService } from "./server/server.service";
import { ServerSchema } from "@harmony/zod";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ChannelController } from "./channel/channel.controller";
import { ChannelService } from "./channel/channel.service";
import { ChannelAuthorizationService } from "./channel/channel-authorization.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.ACCOUNT),
      getService(Services.AUTHORIZATION),
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Server", schema: ServerSchema }]),
    MongooseModule.forFeature([{ name: "Channel", schema: ChannelSchema }]),
  ],
  controllers: [ServerController, ChannelController],
  providers: [ServerService, ChannelService, ChannelAuthorizationService],
  exports: [ChannelService],
})
export class AppModule {}
