import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendshipController } from "./friendship.controller";
import { FriendRequestSchema } from "@harmony/nest-schemas";
import { FriendSchema } from "@harmony/nest-schemas";
import { FriendRequestService } from "./friendRequest/friendRequest.service";
import { FriendService } from "./friend/friend.service";
import { ClientsModule } from "@nestjs/microservices";
import { Services, getService } from "@harmony/service-config";
import { NestMicroserviceModule } from "@harmony/nest-microservice";

@Module({
  imports: [
    NestMicroserviceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([getService(Services.ACCOUNT)]),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: "FriendRequest", schema: FriendRequestSchema },
      { name: "Friend", schema: FriendSchema },
    ]),
  ],

  controllers: [FriendshipController],
  providers: [FriendRequestService, FriendService],
})
export class FriendshipModule {}
