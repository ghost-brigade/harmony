import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { MessageGetType } from "@harmony/zod";
import { DeleteEndpoint } from "apps/client/src/app/core/constants/endpoints/delete.constants";
import { PutEndpoint } from "apps/client/src/app/core/constants/endpoints/put.constants";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";

@Injectable({
  providedIn: "root",
})
export class MessagePopService {
  requestService = inject(RequestService);
  serverService = inject(ServerService);
  $isOpen = signal(false);
  $message: WritableSignal<MessageGetType | undefined> = signal(undefined);

  open(message: MessageGetType) {
    this.$message.set(message);
    this.$isOpen.set(true);
  }

  close() {
    this.$message.set(undefined);
    this.$isOpen.set(false);
  }

  editMessage(messageId: string, content: string) {
    this.requestService
      .put({
        endpoint: PutEndpoint.UpdateMessage,
        params: { id: messageId },
        body: { content },
      })
      .subscribe({
        next: () => {
          this.serverService.$messages.set(
            this.serverService
              .$messages()
              .map((message) =>
                message.id === messageId ? { ...message, content } : message
              )
          );
        },
      });
  }

  deleteMessage(messageId: string) {
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.DeleteMessage,
        params: { id: messageId },
      })
      .subscribe({
        next: () => {
          this.serverService.$messages.set(
            this.serverService
              .$messages()
              .filter((message) => message.id !== messageId)
          );
        },
      });
  }
}
