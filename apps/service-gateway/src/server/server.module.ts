import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { NestMicroserviceModule } from "@harmony/nest-microservice";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.SERVER)]),
  ],
  controllers: [ServerController],
})
export class ServerModule {}
