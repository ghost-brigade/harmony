import {
  Component,
  Input,
  WritableSignal,
  computed,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerGetType } from "@harmony/zod";
import { CHANNEL_LIST_ANIMATION } from "./channel-list.animation";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { SocketService } from "../../../../services/socket.service";
import { ServerIconComponent } from "../../server-icon/server-icon.component";
import { RouterModule } from "@angular/router";
import { ServerPopService } from "../../server-pop/server-pop.service";
import { AuthService } from "apps/client/src/app/core/services/auth.service";
import { FormsModule } from "@angular/forms";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { PostEndpoint } from "apps/client/src/app/core/constants/endpoints/post.constants";

@Component({
  selector: "harmony-channel-list",
  standalone: true,
  imports: [CommonModule, ServerIconComponent, RouterModule, FormsModule],
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
  authService = inject(AuthService);
  requestService = inject(RequestService);
  serverPopService = inject(ServerPopService);
  channelAddOpen = false;
  newChannelName = "";
  newChannelType = "TEXT";

  $isOwner = computed(
    () => this.$server()?.owner.id === this.authService.$userId()
  );
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

  openChannelAdd() {
    this.channelAddOpen = true;
  }
  closeChannelAdd() {
    this.channelAddOpen = false;
  }

  selectChannel(channel: string) {
    this.serverService.setActiveChannel(channel);
    this.socketService.joinChannel(channel);
    this.serverService.$isChannelListOpen.set(false);
  }

  openServerPop() {
    this.serverPopService.open();
  }

  addChannel() {
    this.requestService
      .post({
        endpoint: PostEndpoint.CreateChannel,
        body: {
          server: this.$server()?.id as string,
          name: this.newChannelName,
          type: this.newChannelType,
          order: (this.$server()?.channels?.length as number) - 1,
        },
      })
      .subscribe({
        next: () => {
          this.closeChannelAdd();
        },
      });
  }
}
