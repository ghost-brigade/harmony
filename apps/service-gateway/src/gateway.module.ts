import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AccountModule } from "./account/account.module";

@Module({
  imports: [
    AuthenticationModule,
    AccountModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class GatewayModule {}
