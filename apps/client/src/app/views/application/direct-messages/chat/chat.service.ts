import { Injectable, WritableSignal, signal } from "@angular/core";

type Message = {
  author: string;
  content: string;
  date: string | Date;
};
@Injectable({
  providedIn: "root",
})
export class ChatService {
  $messages: WritableSignal<Message[]> = signal([
    {
      author: "John Doe",
      content: "Hello World!",
      date: "2021-01-01",
    },
  ]);

  addMessage(message: Message) {
    this.$messages.update((messages) => [...messages, message]);
  }
}
