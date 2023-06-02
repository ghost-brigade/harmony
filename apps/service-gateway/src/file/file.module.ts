import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { getService, Services } from "@harmony/service-config";
import { FileController } from "./file.controller";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.FILE)]),
  ],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
