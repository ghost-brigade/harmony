// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";
import { Controller, UseInterceptors } from "@nestjs/common";
import { UserContext } from "@harmony/nest-microservice";
import { MessageService } from "./message.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MESSENGER_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  IdType,
  UserContextType,
  MessageCreateType,
  MessageUpdateType,
} from "@harmony/zod";
import { MessageCreateService } from "./message-create.service";
import { MessageDeleteService } from "./message-delete.service";
import { MessageUpdateService } from "./message-update.service";
import { GlobalAllMessageInterceptor } from "./interceptors/global-all-message.interceptor";

@Controller()
export class MessageController {
  constructor(
    private readonly messageCreateService: MessageCreateService,
    private readonly messageDeleteService: MessageDeleteService,
    private readonly messageUpdateService: MessageUpdateService,
    private readonly messageService: MessageService
  ) {}

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.CREATE)
  create(
    @Payload() payload: { message: MessageCreateType; attachments: Multer[] },
    @UserContext() user: UserContextType
  ) {
    return this.messageCreateService.create(payload, user);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.DELETE)
  delete(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return this.messageDeleteService.delete(payload, user);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.DELETE_BY_CHANNEL_ID)
  deleteByChannelId(
    @Payload() payload: { channelId: IdType },
    @UserContext() user: UserContextType
  ) {
    return this.messageDeleteService.deleteByChannelId(payload);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.UPDATE)
  update(
    @Payload() payload: { message: MessageUpdateType },
    @UserContext() user: UserContextType
  ) {
    return this.messageUpdateService.update(payload, user);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_BY_ID)
  findById(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType,
    authorization: boolean = true
  ) {
    return this.messageService.findById(payload, user, authorization);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_BY_CHANNEL_ID)
  @UseInterceptors(GlobalAllMessageInterceptor)
  findByChannelId(
    @Payload()
    payload: { channelId: IdType; params?: { page?: number; limit?: number } },
    @UserContext() user: UserContextType
  ) {
    return this.messageService.findByChannelId(payload, user);
  }

  // @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_ALL)
  // findAll(@UserContext() userContext: UserParamsType) {
  //   return this.messageService.findAll(userContext);
  // }
}
