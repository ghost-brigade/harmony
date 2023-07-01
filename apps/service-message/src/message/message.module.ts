import { Module } from "@nestjs/common";

import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ClientsModule } from "@nestjs/microservices";
import { MessageSchema } from "@harmony/nest-schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { Services, getService } from "@harmony/service-config";
import { MessageCreateService } from "./message-create.service";
import { MessageDeleteService } from "./message-delete.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.NOTIFICATION),
      getService(Services.AUTHORIZATION),
      getService(Services.SERVER),
      getService(Services.SEARCH),
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageCreateService, MessageDeleteService],
})
export class MessageModule {}
