import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { PrivateMessageController } from "./private-message.controller";
import { MessageGateway } from "./private-message.gateway";
import { WsAuthService } from "../ws-auth.service";
import { MessageAuthorizationService } from "./private-message-authorization.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.AUTHENTICATION),
      getService(Services.SERVER),
      getService(Services.PRIVATE_MESSAGE),
    ]),
  ],
  controllers: [PrivateMessageController],
  providers: [WsAuthService, MessageGateway, MessageAuthorizationService],
  exports: [WsAuthService],
})
export class PrivateMessageModule {}
