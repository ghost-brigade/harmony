import { Controller } from "@nestjs/common";
import { UserContext } from "@harmony/nest-microservice";
import { MessageService } from "./message.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MESSENGER_MESSAGE_PATTERN } from "@harmony/service-config";
import {
  IdType,
  UserContextType,
  MessageCreateType,
  UserParamsType,
  MessageUpdateDto,
} from "@harmony/zod";
import { MessageCreateService } from "./message-create.service";
import { MessageDeleteService } from "./message-delete.service";

@Controller()
export class MessageController {
  constructor(
    private readonly messageCreateService: MessageCreateService,
    private readonly messageDeleteService: MessageDeleteService,
    private readonly messageService: MessageService
  ) {}

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.CREATE)
  create(
    @Payload() payload: { message: MessageCreateType },
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

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_BY_ID)
  findById(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType,
    authorization: boolean = true
  ) {
    return this.messageService.findById(payload, user, authorization);
  }

  // @MessagePattern(MESSENGER_MESSAGE_PATTERN.UPDATE)
  // updateMessage(
  //   @Payload() payload: { content: MessageUpdateDto; id: IdType },
  //   @UserContext() userContext: UserContextType
  // ) {
  //   return this.messageService.updateMessage(payload, userContext);
  // }

  // @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_ALL)
  // findAll(@UserContext() userContext: UserParamsType) {
  //   return this.messageService.findAll(userContext);
  // }

  // @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_BY_ID)
  // findMessage(
  //   @Payload() payload: { id: IdType },
  //   @UserContext() userContext: UserContextType
  // ) {
  //   return this.messageService.findMessage(payload, userContext);
  // }
}
