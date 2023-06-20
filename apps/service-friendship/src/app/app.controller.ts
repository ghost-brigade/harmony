import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FRIENDSHIP_MESSAGE_PATTERN } from "@harmony/service-config";
import { IdType, UserContextType } from "@harmony/zod";
import { UserContext } from "@harmony/nest-microservice";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern( FRIENDSHIP_MESSAGE_PATTERN.CREATE )
  request(@Payload() payload: IdType, @UserContext() userContext: UserContextType)
  {
    return this.appService.getData();
  }

}
