import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ClientsModule } from "@nestjs/microservices";
import { Services, getService } from "@harmony/service-config";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.ACCOUNT),
      getService(Services.ROLE),
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
