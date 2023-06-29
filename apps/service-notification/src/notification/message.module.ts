import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { MessageController } from "./message.controller";
import { MessageGateway } from "./message.gateway";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.NOTIFICATION)]),
  ],
  controllers: [MessageController],
  providers: [MessageGateway],
})
export class MessageModule {}
