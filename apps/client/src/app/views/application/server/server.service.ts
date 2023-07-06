import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { MessageGetType } from "@harmony/zod";
import { RequestService } from "../../../core/services/request.service";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../../../core/constants/api.constants";
import { AuthService } from "../../../core/services/auth.service";
import { finalize } from "rxjs";
import { AlertService } from "../../../core/components/alert/alert.service";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

@Injectable({
  providedIn: "root",
})
export class ServerService {
  requestService = inject(RequestService);
  http = inject(HttpClient);
  authService = inject(AuthService);
  alertService = inject(AlertService);
  $isChannelListOpen = signal(false);
  $isUserListOpen = signal(false);
  $isCallOpen = signal(false);
  $activeChannel = signal("");
  $messages: WritableSignal<MessageGetType[]> = signal([]);
  $file: WritableSignal<Blob | undefined> = signal(undefined);
  isLoading = false;
  audio = new Audio("/assets/sound/notification.mp3");
  lastMessageRequest:
    | {
        count: number;
        currentPage: number;
        lastPage: number;
        messages: MessageGetType[];
      }
    | undefined;
  $loadingDone = signal(false);
  $voiceChannel = signal("");

  openChannelList() {
    this.$isChannelListOpen.set(true);
  }

  closeChannelList() {
    this.$isChannelListOpen.set(false);
  }

  openUserList() {
    this.$isUserListOpen.set(true);
  }

  closeUserList() {
    this.$isUserListOpen.set(false);
  }

  openCall() {
    this.$isCallOpen.set(true);
  }

  closeCall() {
    this.$isCallOpen.set(false);
  }

  setActiveChannel(channel: string) {
    this.$messages.set([]);
    this.lastMessageRequest = undefined;
    this.$loadingDone.set(false);
    this.$isCallOpen.set(false);
    this.$activeChannel.set(channel);
  }

  getChannelMessages(channelId: string) {
    if (
      this.lastMessageRequest !== undefined &&
      this.lastMessageRequest?.currentPage === this.lastMessageRequest?.lastPage
    ) {
      this.$loadingDone.set(true);
      return;
    }
    this.$loadingDone.set(false);
    this.lastMessageRequest = undefined;
    this.requestService
      .get({
        endpoint: GetEndpoint.ChannelMessages,
        params: {
          channelId,
        },
        queryParams: {
          limit: 30,
          page: 1,
        },
      })
      .subscribe({
        next: (messages) => {
          this.$messages.set(messages.messages);
          this.lastMessageRequest = messages;
          setTimeout(() => {
            const messageList = document.querySelector("#message-list");
            messageList?.scroll({
              top: messageList.scrollHeight,
              behavior: "smooth",
            });
          }, 500);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }

  addMessage(message: MessageGetType) {
    if (message.author.id !== this.authService.$userId()) {
      this.audio.play();
    }
    this.$messages.set([message, ...this.$messages()]);
  }

  sendMessage(content: string) {
    const form = new FormData();
    form.append("channel", this.$activeChannel());
    form.append("content", content);
    if (this.$file()) {
      form.append("attachements[]", this.$file() as Blob);
    }
    this.$file.set(undefined);
    this.http
      .post(API_BASE_URL + "/message", form, {
        headers: {
          Authorization: `Bearer ${this.authService.$token()}`,
        },
      })
      .subscribe({
        next: (message) => {
          Haptics.impact({
            style: ImpactStyle.Heavy,
          });
        },
        error: (error) => {
          this.alertService.show({
            message: error.error.message,
            type: "error",
          });
        },
      });
  }

  getMoreMessages() {
    if (this.isLoading) {
      console.log("already loading");
      return;
    }
    if (this.lastMessageRequest) {
      this.isLoading = true;
    }
    if (this.lastMessageRequest) {
      if (
        this.lastMessageRequest.currentPage < this.lastMessageRequest.lastPage
      ) {
        this.requestService
          .get({
            endpoint: GetEndpoint.ChannelMessages,
            params: {
              channelId: this.$activeChannel(),
            },
            queryParams: {
              limit: 30,
              page: +this.lastMessageRequest.currentPage + 1,
            },
          })
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: (messages) => {
              this.lastMessageRequest = messages;
              if (
                this.lastMessageRequest.currentPage ===
                this.lastMessageRequest.lastPage
              ) {
                this.$loadingDone.set(true);
              }
              this.$messages().push(...messages.messages);
            },
            error: (err) => {
              this.alertService.show({
                message: err.error.message,
                type: "error",
              });
            },
          });
      } else {
        this.$loadingDone.set(true);
      }
    }
  }
}
