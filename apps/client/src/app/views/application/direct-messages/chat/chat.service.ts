import { Injectable, WritableSignal, signal } from "@angular/core";
import { MessageGetType, UserType } from "@harmony/zod";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  $messages: WritableSignal<MessageGetType[]> = signal([]);
  $user: WritableSignal<UserType | undefined> = signal(undefined);
  $loadingDone = signal(false);
}
