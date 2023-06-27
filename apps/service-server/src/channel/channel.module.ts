import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChannelSchema } from "@harmony/nest-schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule } from "@nestjs/microservices";
import { Services, getService } from "@harmony/service-config";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ChannelAuthorizationService } from "./channel-authorization.service";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";

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
    MongooseModule.forFeature([
      { name: "Channel", schema: ChannelSchema },
    ]),
  ],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelAuthorizationService],
  exports: [ChannelService],
})
export class ChannelModule {}
