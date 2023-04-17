import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
  imports: [ClientsModule.register([getService(Services.ACCOUNT)])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
