import { ConfigModule } from "@nestjs/config";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Services, getService } from "@harmony/service-config";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { PrivateMessageSchema } from "@harmony/nest-schemas";
import { PrivateMessageController } from "./private-message.controller";
import { PrivateMessageService } from "./private-message.service";
@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([
      getService(Services.NOTIFICATION),
      getService(Services.FILE),
      getService(Services.ACCOUNT),
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: "PrivateMessage", schema: PrivateMessageSchema },
    ]),
  ],
  controllers: [PrivateMessageController],
  providers: [PrivateMessageService],
})
export class PrivateMessageModule {}
