import {
  Component,
  Input,
  WritableSignal,
  computed,
  inject,
} from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
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
import { DeleteEndpoint } from "apps/client/src/app/core/constants/endpoints/delete.constants";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { Dialog } from "@capacitor/dialog";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";

@Component({
  selector: "harmony-channel-list",
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ServerIconComponent,
    RouterModule,
    FormsModule,
    NgAutoAnimateDirective,
    I18nPipe,
  ],
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
  toastService = inject(ToastService);
  requestService = inject(RequestService);
  serverPopService = inject(ServerPopService);
  alertService = inject(AlertService);
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
      this.serverService.$voiceChannel.set(channel);
      this.socketService.joinChannel(channel);
    }
  }

  openChannelAdd() {
    this.channelAddOpen = true;
  }
  closeChannelAdd() {
    this.channelAddOpen = false;
  }

  selectChannel(channelObj: {
    id: string;
    name: string;
    type: "TEXT" | "VOICE";
    order: number;
  }) {
    if (channelObj.type === "VOICE") {
      this.clickVoiceChannel(channelObj.id);
      return;
    }
    const channel = channelObj.id;
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
        next: (res) => {
          this.closeChannelAdd();
          this.$server()?.channels.push(res);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }

  async deleteChannel(channel: string) {
    const d = await Dialog.confirm({
      title: "Delete Channel",
      message: "Are you sure you want to delete this channel?",
      okButtonTitle: "Delete",
      cancelButtonTitle: "Cancel",
    });
    if (!d.value) return;
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.DeleteChannel,
        params: {
          id: channel,
        },
      })
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "CHANNEL_DELETE_SUCCESS",
            type: "success",
          });
          const newChannels = this.$server()?.channels.filter(
            (c) => c.id !== channel
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.$server().channels = newChannels;
          if (this.currentChannel === channel) {
            this.selectChannel(
              this.$server()?.channels?.[0] as {
                id: string;
                name: string;
                type: "TEXT" | "VOICE";
                order: number;
              }
            );
          }
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }
}
