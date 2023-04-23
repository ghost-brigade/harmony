import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";

@Module({
  imports: [ClientsModule.register([getService(Services.AUTHENTICATION)])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
