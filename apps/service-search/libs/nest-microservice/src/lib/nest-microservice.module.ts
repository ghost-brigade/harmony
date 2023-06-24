import { Module } from "@nestjs/common";
import { ServiceRequest } from "./service-request.service";

@Module({
  providers: [ServiceRequest],
  exports: [ServiceRequest],
})
export class NestMicroserviceModule {}
