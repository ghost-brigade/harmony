import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "../../../shared/components/application/server/user-list/user-list.component";
import { ChannelListComponent } from "../../../shared/components/application/server/channel-list/channel-list.component";
import { RequestService } from "../../../core/services/request.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { ServerGetType } from "@harmony/zod";
import { ServerNavbarComponent } from "../../../shared/components/application/server/server-navbar/server-navbar.component";
import { SocketService } from "../../../shared/services/socket.service";
import { MessageNotification } from "@harmony/notification";
import { ServerService } from "./server.service";
import { CallComponent } from "../../../shared/components/application/server/call/call.component";
import { MessageComponent } from "../../../shared/components/application/message/message.component";
import { NgAutoAnimateDirective } from "ng-auto-animate";

@Component({
  selector: "harmony-server",
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    ChannelListComponent,
    ServerNavbarComponent,
    CallComponent,
    MessageComponent,
    NgAutoAnimateDirective,
  ],
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  requestService = inject(RequestService);
  socketService = inject(SocketService);
  serverService = inject(ServerService);
  router = inject(Router);
  $server: WritableSignal<ServerGetType | null> = signal(null);
  $isChannelListOpen = computed(() => this.serverService.$isChannelListOpen());
  $isUserListOpen = computed(() => this.serverService.$isUserListOpen());
  $isCallOpen = computed(() => this.serverService.$isCallOpen());
  $activeChannel = computed(() => this.serverService.$activeChannel());
  $channelMessages = computed(() => this.serverService.$messages());

  $currentChannelName = computed(() => {
    const channel = this.$server()?.channels?.find(
      (c) => c.id === this.$activeChannel()
    );
    return channel?.name;
  });
  $socket = computed(() => {
    this.socketService.joinChannel(this.$activeChannel());
    console.log("joined:", this.$activeChannel());
  });

  constructor(private route: ActivatedRoute) {
    this.socketService.messageSocket.on(
      MessageNotification.NEW_MESSAGE,
      (message) => {
        console.log(message);
      }
    );
  }

  scrollToBottom() {
    if (this.$channelMessages().length > 0) {
      const messageList = document.querySelector("#message-list");
      messageList?.scroll({
        top: messageList.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { serverId } = params;
      console.log(serverId);
      this.requestService
        .get({
          endpoint: GetEndpoint.Server,
          params: {
            serverId,
          },
        })
        .subscribe({
          next: (server) => {
            this.$server.set(server);
            this.serverService.setActiveChannel(server.channels[0].id);
            this.socketService.joinChannel(this.serverService.$activeChannel());
          },
        });
    });
  }
}
