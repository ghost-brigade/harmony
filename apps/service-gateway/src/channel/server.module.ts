import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { ChannelController } from "../channel/channel.controller";
import { NestMicroserviceModule } from "@harmony/nest-microservice";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.SERVER)]),
  ],
  controllers: [ChannelController],
})
export class ChannelModule {}
