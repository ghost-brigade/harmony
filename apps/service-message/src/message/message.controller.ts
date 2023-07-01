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

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.CREATE)
  request(
    @Payload() payload: { message: MessageCreateType },
    @UserContext() userContext: UserContextType
  ) {
    return this.messageService.newMessage(payload, userContext);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.UPDATE)
  updateMessage(
    @Payload() payload: { content: MessageUpdateDto; id: IdType },
    @UserContext() userContext: UserContextType
  ) {
    return this.messageService.updateMessage(payload, userContext);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_ALL)
  findAll(@UserContext() userContext: UserParamsType) {
    return this.messageService.findAll(userContext);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.FIND_BY_ID)
  findMessage(
    @Payload() payload: { id: IdType },
    @UserContext() userContext: UserContextType
  ) {
    return this.messageService.findMessage(payload, userContext);
  }

  @MessagePattern(MESSENGER_MESSAGE_PATTERN.DELETE)
  deleteMessage(
    @Payload() payload: { id: IdType },
    @UserContext() userContext: UserContextType
  ) {
    return this.messageService.deleteMessage(payload, userContext);
  }
}
