import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserSchema } from "@harmony/nest-schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UserService } from "./user.service";
import { ProfileController } from "./profile.controller";
import { UserAvatarController } from "./user-avatar.controller";
import { UserAvatarService } from "./user-avatar.service";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ClientsModule } from "@nestjs/microservices";
import { Services, getService } from "@harmony/service-config";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.FILE), getService(Services.AUTHORIZATION)]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [UserController, ProfileController, UserAvatarController],
  providers: [
    UserService,
    UserAvatarService,
  ],
  exports: [UserService, UserAvatarService],
})
export class UserModule {}
