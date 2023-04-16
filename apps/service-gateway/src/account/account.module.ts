import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, servicesEnum } from "@harmony/service-config";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
  imports: [ClientsModule.register([getService(servicesEnum.ACCOUNT)])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
