import { Module } from "@nestjs/common";
import { MessageModule } from "./message/message.module";
import { DefaultModule } from "./default/default.module";
import { ServerModule } from "apps/service-gateway/src/server/server.module";
@Module({
  imports: [DefaultModule, MessageModule, ServerModule],
})
export class AppModule {}
