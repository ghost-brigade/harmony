import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { NestMicroserviceModule } from "@harmony/nest-microservice";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.SEARCH)]),
  ],
  controllers: [SearchController],
})
export class SearchModule {}
