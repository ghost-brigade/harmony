import { Module } from "@nestjs/common";

import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ClientsModule } from "@nestjs/microservices";
import { MessageSchema } from "@harmony/nest-schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    NestMicroserviceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
