import { Injectable, WritableSignal, signal } from "@angular/core";
import { MessageGetType } from "@harmony/zod";

@Injectable({
  providedIn: "root",
})
export class MessagePopService {
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
}
