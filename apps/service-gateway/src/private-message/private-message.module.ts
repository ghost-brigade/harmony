import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { PrivateMessageController } from "./private-message.controller";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.PRIVATE_MESSAGE)]),
  ],
  controllers: [PrivateMessageController],
  providers: [],
})
export class PrivateMessageModule {}
