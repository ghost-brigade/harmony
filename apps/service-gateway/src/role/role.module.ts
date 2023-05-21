import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { RoleController } from "./role.controller";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.ROLE)]),
  ],
  controllers: [RoleController],
  providers: [],
})
export class RoleModule {}
