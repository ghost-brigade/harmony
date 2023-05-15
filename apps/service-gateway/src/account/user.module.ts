import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { UserController } from "./controllers/user.controller";
import { ProfileController } from "./controllers/profile.controller";

@Module({
  imports: [ClientsModule.register([getService(Services.ACCOUNT)])],
  controllers: [UserController, ProfileController],
})
export class UserModule {}
