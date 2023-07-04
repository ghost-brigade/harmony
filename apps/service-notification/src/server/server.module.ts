import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { WsAuthService } from "../ws-auth.service";
import { ServerController } from "./server.controller";
import { ServerGateway } from "./server.gateway";
import { ServerAuthorizationService } from "./server-authorization.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.AUTHENTICATION),
      getService(Services.SERVER),
    ]),
  ],
  controllers: [ServerController],
  providers: [WsAuthService, ServerGateway, ServerAuthorizationService],
  exports: [WsAuthService],
})
export class ServerModule {}
