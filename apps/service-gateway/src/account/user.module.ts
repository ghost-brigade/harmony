import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { UserController } from "./controllers/user.controller";
import { ProfileController } from './controllers/profile.controller';
import { UserService } from "./user.service";

@Module({
  imports: [ClientsModule.register([getService(Services.ACCOUNT)])],
  controllers: [UserController, ProfileController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
