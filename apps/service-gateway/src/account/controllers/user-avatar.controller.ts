import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Controller("user")
@ApiTags("User")
export class UserAvatarController {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Change user avatar" })
  @ApiCreatedResponse({
    status: 201,
    description: "Avatar changed",
  })
  @ApiUnprocessableEntityResponse({ description: "Invalid parameters" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @UseInterceptors(FileInterceptor("file"))
  @Post("avatar")
  changeAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.CHANGE_AVATAR,
      data: { file },
    });
  }
}
