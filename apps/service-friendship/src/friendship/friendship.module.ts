import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { FriendshipSchema } from "@harmony/nest-schemas";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Friendship", schema: FriendshipSchema }]),
  ],

  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule {}
