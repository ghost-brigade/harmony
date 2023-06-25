import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { FriendshipController } from "./friendship.controller";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.FRIENDSHIP)]),
  ],
  controllers: [FriendshipController],
  providers: [],
})
export class FriendshipModule {}
