import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { MessageController } from "./message.controller";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.MESSAGE)]),
  ],
  controllers: [MessageController],
  providers: [],
})
export class MessageModule {}
