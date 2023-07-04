import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { WsAuthService } from "../ws-auth.service";
import { GlobalController } from "./global.controller";
import { GlobalGateway } from "./global.gateway";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.AUTHENTICATION),
      getService(Services.SERVER),
    ]),
  ],
  controllers: [GlobalController],
  providers: [WsAuthService, GlobalGateway],
  exports: [WsAuthService],
})
export class GlobalModule {}
