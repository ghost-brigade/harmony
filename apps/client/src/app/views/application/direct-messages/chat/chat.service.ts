import { HttpClient } from "@angular/common/http";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { MessageGetType, UserType } from "@harmony/zod";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { API_BASE_URL } from "apps/client/src/app/core/constants/api.constants";
import { GetEndpoint } from "apps/client/src/app/core/constants/endpoints/get.constants";
import { AuthService } from "apps/client/src/app/core/services/auth.service";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { finalize } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  http = inject(HttpClient);
  requestService = inject(RequestService);
  authService = inject(AuthService);
  alertService = inject(AlertService);
  $messages: WritableSignal<MessageGetType[]> = signal([]);
  $user: WritableSignal<UserType | undefined> = signal(undefined);
  $loadingDone = signal(false);
  $file: WritableSignal<Blob | undefined> = signal(undefined);
  isLoading = false;
  lastMessageRequest:
    | {
        count: number;
        currentPage: number;
        lastPage: number;
        messages: MessageGetType[];
      }
    | undefined;

  sendMessage(content: string) {
    const form = new FormData();
    form.append("content", content);
    if (this.$file()) {
      form.append("attachments", this.$file() as Blob);
    }
    this.$file.set(undefined);
    this.http
      .post(API_BASE_URL + "/private-message/user/" + this.$user()?.id, form, {
        headers: {
          Authorization: `Bearer ${this.authService.$token()}`,
        },
      })
      .subscribe({
        next: () => {
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
            endpoint: GetEndpoint.DM,
            params: {
              id: this.$user()?.id as string,
            },
            queryParams: {
              limit: 50,
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

  addMessage(message: MessageGetType) {
    this.$messages.set([message, ...this.$messages()]);
  }
}
