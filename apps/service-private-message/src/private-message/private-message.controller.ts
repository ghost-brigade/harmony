// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";
import { Controller, UseInterceptors } from "@nestjs/common";
import { UserContext } from "@harmony/nest-microservice";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PRIVATE_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  MessageCreateType,
  UserContextType,
  UserParamsType,
} from "@harmony/zod";
import { PrivateMessageService } from "./private-message.service";
import { GlobalUserPrivateMessageInterceptor } from "./interceptors/global-user-private-message.interceptor";

@Controller()
export class PrivateMessageController {
  constructor(private readonly privateMessageService: PrivateMessageService) {}

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.FIND_ALL)
  @UseInterceptors(GlobalUserPrivateMessageInterceptor)
  findAll(@UserContext() userContext: UserParamsType) {
    return this.privateMessageService.findAll(userContext);
  }

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.CREATE)
  create(
    @Payload() payload: { message: MessageCreateType; attachments: Multer[] },
    @UserContext() user: UserContextType
  ) {
    return this.privateMessageService.create(payload, user);
  }
}
