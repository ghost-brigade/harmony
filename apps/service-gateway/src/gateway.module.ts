import { getServicesList } from '@harmony/service-config';
import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ClientsModule } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register(
      getServicesList()
    ),
  ],
  controllers: [],
  providers: [AuthenticationModule],
  exports: [ClientsModule],
})
export class GatewayModule {}
