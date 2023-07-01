import { Module } from "@nestjs/common";
import { MessageModule } from "./notification/message.module";
import { DefaultModule } from "./default/default.module";
@Module({
  imports: [DefaultModule, MessageModule],
})
export class AppModule {}
