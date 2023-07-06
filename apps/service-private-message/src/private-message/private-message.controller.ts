// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";
import { Controller, UseInterceptors } from "@nestjs/common";
import { UserContext } from "@harmony/nest-microservice";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PRIVATE_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  IdType,
  MessageCreateType,
  PrivateMessageDto,
  UserContextType,
  UserParamsType,
} from "@harmony/zod";
import { PrivateMessageService } from "./private-message.service";
import { GlobalAllPrivateMessageInterceptor } from "./interceptors/global-all-private-message.interceptor";
import { GlobalPrivateMessageInterceptor } from "./interceptors/global-private-message.interceptor";

@Controller()
export class PrivateMessageController {
  constructor(private readonly privateMessageService: PrivateMessageService) {}

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.FIND_ALL)
  @UseInterceptors(GlobalAllPrivateMessageInterceptor)
  findAll(@UserContext() userContext: UserParamsType) {
    return this.privateMessageService.findAll(userContext);
  }

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.FIND_MESSAGES_WITH_USER)
  @UseInterceptors(GlobalPrivateMessageInterceptor)
  findMessagesWithUser(
    @Payload()
    payload: {
      userId: IdType;
      params?: { page?: number; limit?: number };
    },
    @UserContext() user: UserContextType
  ) {
    return this.privateMessageService.findMessagesWithUser(payload, user);
  }

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.GET_BY_ID)
  async getById(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return this.privateMessageService.getById(payload, user);
  }

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.CREATE)
  create(
    @Payload() payload: { message: MessageCreateType; attachments: Multer[] },
    @UserContext() user: UserContextType
  ) {
    return this.privateMessageService.create(payload, user);
  }

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.UPDATE)
  // @UseInterceptors(GlobalUserPrivateMessageInterceptor)
  updateMessage(
    @Payload() payload: { messageId: string; privateMessage: PrivateMessageDto }
  ) {
    const { messageId, privateMessage } = payload;
    return this.privateMessageService.updateMessage(messageId, privateMessage);
  }

  @MessagePattern(PRIVATE_MESSAGE_PATTERN.DELETE)
  // @UseInterceptors(GlobalUserPrivateMessageInterceptor)
  deleteMessage(@Payload() payload: { messageId: string }) {
    const { messageId } = payload;
    return this.privateMessageService.deleteMessage(messageId);
  }
}
