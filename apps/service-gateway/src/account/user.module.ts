import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { UserController } from "./controllers/user.controller";
import { ProfileController } from "./controllers/profile.controller";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { UserAvatarController } from "./controllers/user-avatar.controller";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.ACCOUNT)]),
  ],
  controllers: [UserAvatarController, UserController, ProfileController],
})
export class UserModule {}
