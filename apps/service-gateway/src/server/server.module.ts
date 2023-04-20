import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";

@Module({
  imports: [ClientsModule.register([getService(Services.SERVER)])],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
