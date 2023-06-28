import { Controller, Get, Post } from "@nestjs/common";
import { UserContext } from "@harmony/nest-microservice";
import { MessageService } from "./message.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MESSENGER_MESSAGE_PATTERN } from "@harmony/service-config";
import { IdType, UserContextType, MessageCreateType, UserParamsType } from "@harmony/zod";

@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    ) {}

  @MessagePattern( MESSENGER_MESSAGE_PATTERN.CREATE )
  request(
    @Payload() payload: {message:MessageCreateType}, 
    @UserContext() userContext: UserContextType)
  {
    return this.messageService.newMessage(payload, userContext);
  }

  @MessagePattern( MESSENGER_MESSAGE_PATTERN.FIND_ALL )
  findAll(
    @UserContext() userContext: UserParamsType)
  {
    return this.messageService.findAll(userContext);
  }
}
