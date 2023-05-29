import { Controller, Get, Inject } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceRequest } from "@harmony/nest-microservice";
import { Observable } from "rxjs";
import { UserType } from "@harmony/zod";

@Controller()
export class ProfileController {
  constructor(
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiTags("User")
  @ApiOperation({ summary: "Get the profile of the current logged in user" })
  @ApiOkResponse({ description: "Profile found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Profile not found" })
  @Get("profile")
  profile() {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.PROFILE,
    }) as Observable<UserType>;
  }
}
