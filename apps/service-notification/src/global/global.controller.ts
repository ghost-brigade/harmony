import { NOTIFICATION_MESSAGE_PATTERN } from "@harmony/service-config";
import { ServerType } from "@harmony/zod";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GlobalGateway } from "./global.gateway";

@Controller()
export class GlobalController {
  constructor(private readonly globalGateway: GlobalGateway) {}

  @MessagePattern(NOTIFICATION_MESSAGE_PATTERN.NEW_SERVER_MESSAGE)
  async newServerMessage(
    @Payload() payload: { server: ServerType }
  ): Promise<void> {
    return await this.globalGateway.onNewMessage({
      server: payload.server,
    });
  }
}
