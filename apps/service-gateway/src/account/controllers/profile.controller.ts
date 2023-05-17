import { Controller, Get, Inject, Req } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  RequestWithUser,
  getUserFromRequest,
} from "../../core/utils/get-user-from-request";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { UserProfileType } from "@harmony/zod";

@Controller()
export class ProfileController {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiTags('User')
  @ApiOperation({ summary: "Get the profile of the current logged in user" })
  @ApiOkResponse({ description: "Profile found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Profile not found" })
  @Get("profile")
  async profile(
    @Req() request: RequestWithUser
  ): Promise<Observable<UserProfileType>> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.PROFILE, {
      user: await getUserFromRequest(request),
    });
  }
}
