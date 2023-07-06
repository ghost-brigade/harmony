import { Component, OnDestroy, OnInit, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageComponent } from "apps/client/src/app/shared/components/application/message/message.component";
import { ChatService } from "./chat.service";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { DmNavbarComponent } from "apps/client/src/app/shared/components/application/dm-navbar/dm-navbar.component";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { GetEndpoint } from "apps/client/src/app/core/constants/endpoints/get.constants";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { MessageGetType } from "@harmony/zod";
import {
  MessageNotification,
  PrivateMessageNotification,
} from "@harmony/notification";
import { SocketService } from "apps/client/src/app/shared/services/socket.service";

@Component({
  selector: "harmony-chat",
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    NgAutoAnimateDirective,
    DmNavbarComponent,
  ],
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, OnDestroy {
  chatService = inject(ChatService);
  requestService = inject(RequestService);
  socketService = inject(SocketService);
  alertService = inject(AlertService);
  $messages = computed(() => this.chatService.$messages());
  $loadingDone = computed(() => this.chatService.$loadingDone());

  eventListener: (message: MessageGetType) => void;

  handleNewMessage(message: MessageGetType) {
    this.chatService.addMessage(message);
  }
  constructor(private route: ActivatedRoute) {
    this.eventListener = this.handleNewMessage.bind(this);
    this.socketService.dmSocket.on(
      PrivateMessageNotification.NEW_MESSAGE,
      this.eventListener
    );
  }

  ngOnDestroy(): void {
    this.socketService.dmSocket.off(
      MessageNotification.NEW_MESSAGE,
      this.eventListener
    );
    this.chatService.$messages.set([]);
    this.chatService.lastMessageRequest = undefined;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params;

      if (this.chatService.$user() === undefined) {
        this.requestService
          .get({
            endpoint: GetEndpoint.User,
            params: {
              userId: id as string,
            },
          })
          .subscribe({
            next: (res) => {
              this.chatService.$user.set(res);
            },
            error: (err) => {
              this.alertService.show({
                message: err.error.message,
                type: "error",
              });
            },
          });
      }

      this.requestService
        .get({
          endpoint: GetEndpoint.DM,
          params: {
            id: id as string,
          },
          queryParams: {
            limit: 50,
            page: 1,
          },
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.chatService.$messages.set(res.messages);
          },
        });
    });
  }
}
