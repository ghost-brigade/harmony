import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "../../../shared/components/application/server/user-list/user-list.component";
import { ChannelListComponent } from "../../../shared/components/application/server/channel-list/channel-list.component";
import { RequestService } from "../../../core/services/request.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { MessageGetType, ServerGetType } from "@harmony/zod";
import { ServerNavbarComponent } from "../../../shared/components/application/server/server-navbar/server-navbar.component";
import { SocketService } from "../../../shared/services/socket.service";
import { MessageNotification } from "@harmony/notification";
import { ServerService } from "./server.service";
import { CallComponent } from "../../../shared/components/application/server/call/call.component";
import { MessageComponent } from "../../../shared/components/application/message/message.component";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { MessagePopComponent } from "../../../shared/components/application/message-pop/message-pop.component";
import { ServerPopComponent } from "../../../shared/components/application/server-pop/server-pop.component";
import { AlertService } from "../../../core/components/alert/alert.service";

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
    MessagePopComponent,
    ServerPopComponent,
  ],
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit, AfterViewInit, OnDestroy {
  requestService = inject(RequestService);
  socketService = inject(SocketService);
  serverService = inject(ServerService);
  alertService = inject(AlertService);
  router = inject(Router);
  $server: WritableSignal<ServerGetType | null> = signal(null);
  $isChannelListOpen = computed(() => this.serverService.$isChannelListOpen());
  $isUserListOpen = computed(() => this.serverService.$isUserListOpen());
  $isCallOpen = computed(() => this.serverService.$isCallOpen());
  $activeChannel = computed(() => this.serverService.$activeChannel());
  $channelMessages = computed(() => this.serverService.$messages());
  $loadingDone = computed(() => this.serverService.$loadingDone());
  $currentChannelName = computed(() => {
    const channel = this.$server()?.channels?.find(
      (c) => c.id === this.$activeChannel()
    );
    return channel?.name;
  });
  eventListener: (message: MessageGetType) => void;

  handleNewMessage(message: MessageGetType) {
    this.serverService.addMessage(message);
  }

  constructor(private route: ActivatedRoute) {
    this.eventListener = this.handleNewMessage.bind(this);
    this.socketService.messageSocket.on(
      MessageNotification.NEW_MESSAGE,
      this.eventListener
    );
  }

  ngOnDestroy(): void {
    this.socketService.messageSocket.off(
      MessageNotification.NEW_MESSAGE,
      this.eventListener
    );
    this.serverService.$isUserListOpen.set(false);
    this.serverService.$isChannelListOpen.set(false);
    this.serverService.$messages.set([]);
    this.serverService.lastMessageRequest = undefined;
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.$channelMessages().length > 0) {
        const messageList = document.querySelector("#message-list");
        messageList?.scroll({
          top: messageList.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 2000);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { serverId } = params;
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
          error: (err) => {
            this.alertService.show({
              message: err.error.message,
              type: "error",
            });
          },
        });
    });
  }

  observeLoader() {
    setTimeout(() => {
      const target = document.querySelector("#refresh-target");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.serverService.getMoreMessages();
            }
          });
        },
        { rootMargin: "0px", threshold: 0.1 }
      );

      observer.observe(target as Element);
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.observeLoader();
  }
}
