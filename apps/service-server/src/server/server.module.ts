import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { ServerSchema } from "@harmony/nest-schemas";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Services, getService } from "@harmony/service-config";
import { ClientsModule } from "@nestjs/microservices";

@Module({
  imports: [
    NestMicroserviceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      getService(Services.ACCOUNT),
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Server", schema: ServerSchema }]),
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [],
})
export class ServerModule {}
