import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { MessageGetType } from "@harmony/zod";
import { RequestService } from "../../../core/services/request.service";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../../../core/constants/api.constants";
import { AuthService } from "../../../core/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class ServerService {
  requestService = inject(RequestService);
  http = inject(HttpClient);
  authService = inject(AuthService);
  $isChannelListOpen = signal(false);
  $isUserListOpen = signal(false);
  $isCallOpen = signal(false);
  $activeChannel = signal("");
  $messages: WritableSignal<MessageGetType[]> = signal([]);

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
    this.$activeChannel.set(channel);
  }

  getChannelMessages(channelId: string) {
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
          console.log(messages);
          this.$messages.set(messages.messages);
        },
      });
  }

  addMessage(message: MessageGetType) {
    this.$messages.set([message, ...this.$messages()]);
  }

  sendMessage(content: string) {
    const form = new FormData();
    form.append("channel", this.$activeChannel());
    form.append("content", content);
    this.http
      .post(API_BASE_URL + "/message", form, {
        headers: {
          Authorization: `Bearer ${this.authService.$token()}`,
        },
      })
      .subscribe({
        next: (message) => {
          console.log(message);
        },
      });
  }
}
