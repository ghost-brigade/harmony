import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { ClientsModule } from "@nestjs/microservices";
import { getService, servicesEnum } from "@harmony/service-config";

@Module({
  imports: [ClientsModule.register([getService(servicesEnum.AUTHENTICATION)])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
