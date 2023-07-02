import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { ChannelSchema, ServerSchema } from "@harmony/nest-schemas";
import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Services, getService } from "@harmony/service-config";
import { ClientsModule } from "@nestjs/microservices";
import { ServerCreateService } from "./server-create.service";
import { ChannelService } from "../channel/channel.service";
import { ChannelAuthorizationService } from "../channel/channel-authorization.service";
import { ServerAuthorizationService } from "./server-authorization.service";
import { ServerDeleteService } from "./server-delete.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      getService(Services.ROLE),
      getService(Services.AUTHORIZATION),
      getService(Services.ACCOUNT),
      getService(Services.AUTHORIZATION),
      getService(Services.FILE),
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: "Server", schema: ServerSchema },
      { name: "Channel", schema: ChannelSchema },
    ]),
  ],
  controllers: [ServerController],
  providers: [
    ServerService,
    ServerCreateService,
    ChannelService,
    ChannelAuthorizationService,
    ServerAuthorizationService,
    ServerDeleteService,
  ],
  exports: [],
})
export class ServerModule {}
