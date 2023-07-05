import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { MessageController } from "./message.controller";
import { MessageGateway } from "./message.gateway";
import { WsAuthService } from "../ws-auth.service";
import { MessageAuthorizationService } from "./message-authorization.service";
import { MessageService } from "./message.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.AUTHENTICATION),
      getService(Services.SERVER),
    ]),
  ],
  controllers: [MessageController],
  providers: [WsAuthService, MessageGateway, MessageAuthorizationService, MessageService],
  exports: [WsAuthService],
})
export class MessageModule {}
