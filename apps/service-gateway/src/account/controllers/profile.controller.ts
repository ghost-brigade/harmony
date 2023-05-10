import { Controller, Get, Req } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  RequestWithUser,
  getUserFromRequest,
} from "../../core/utils/getUserFromRequest";
import { UserService } from "../user.service";

@Controller()
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Get the profile of the current logged in user" })
  @ApiOkResponse({ description: "Profile found" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Profile not found" })
  @Get("profile")
  async profile(@Req() request: RequestWithUser) {
    return this.userService.profile({
      user: await getUserFromRequest(request),
    });
  }
}
