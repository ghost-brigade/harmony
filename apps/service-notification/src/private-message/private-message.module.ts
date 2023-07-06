import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { PrivateMessageController } from "./private-message.controller";
import { WsAuthService } from "../ws-auth.service";
import { PrivateMessageGateway } from "./private-message.gateway";

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
  providers: [WsAuthService, PrivateMessageGateway],
  exports: [WsAuthService],
})
export class PrivateMessageModule {}
