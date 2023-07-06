import { Module } from "@nestjs/common";
import { MessageModule } from "./message/message.module";
import { DefaultModule } from "./default/default.module";
import { ServerModule } from "apps/service-gateway/src/server/server.module";
import { PrivateMessageModule } from "./private-message/private-message.module";
@Module({
  imports: [DefaultModule, MessageModule, ServerModule, PrivateMessageModule],
})
export class AppModule {}
