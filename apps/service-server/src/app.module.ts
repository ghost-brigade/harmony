import { Module } from "@nestjs/common";
import { ServerModule } from "./server/server.module";
import { ChannelModule } from "./channel/channel.module";

@Module({
  // imports: [ServerModule, ChannelModule],
  imports: [ChannelModule, ServerModule],
})
export class AppModule {}
