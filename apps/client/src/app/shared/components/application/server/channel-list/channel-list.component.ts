import { Component, Input, WritableSignal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerGetType } from "@harmony/zod";
import { CHANNEL_LIST_ANIMATION } from "./channel-list.animation";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { SocketService } from "../../../../services/socket.service";
import { ServerIconComponent } from "../../server-icon/server-icon.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "harmony-channel-list",
  standalone: true,
  imports: [CommonModule, ServerIconComponent, RouterModule],
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"],
  animations: CHANNEL_LIST_ANIMATION,
})
export class ChannelListComponent {
  @Input() $server!: WritableSignal<ServerGetType | null>;
  @Input() isOpen = false;
  @Input() currentChannel = "";
  serverService = inject(ServerService);
  socketService = inject(SocketService);

  closeChannelList() {
    this.serverService.closeChannelList();
  }

  clickVoiceChannel(channel: string) {
    const foundChannel = this.$server()?.channels?.find(
      (c) => c.id === channel
    );
    if (foundChannel?.type === "VOICE") {
      this.serverService.openCall();
    }
  }

  selectChannel(channel: string) {
    this.serverService.setActiveChannel(channel);
    this.socketService.joinChannel(channel);
    this.serverService.$isChannelListOpen.set(false);
  }
}
