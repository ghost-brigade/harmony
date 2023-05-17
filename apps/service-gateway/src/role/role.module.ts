import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { RoleController } from "./role.controller";

@Module({
  imports: [ClientsModule.register([getService(Services.ROLE)])],
  controllers: [RoleController],
})
export class RoleModule {}
