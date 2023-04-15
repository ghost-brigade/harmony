import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ConfigModule } from '@harmony/config';

@Module({
  imports: [AuthenticationModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
