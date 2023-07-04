import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { MessageGetType } from "@harmony/zod";
import { RequestService } from "../../../core/services/request.service";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";

@Injectable({
  providedIn: "root",
})
export class ServerService {
  requestService = inject(RequestService);
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
}
