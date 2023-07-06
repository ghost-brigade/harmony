import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageComponent } from "apps/client/src/app/shared/components/application/message/message.component";
import { ChatService } from "./chat.service";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { ServerNavbarComponent } from "apps/client/src/app/shared/components/application/server/server-navbar/server-navbar.component";

@Component({
  selector: "harmony-chat",
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    NgAutoAnimateDirective,
    ServerNavbarComponent,
  ],
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent {
  chatService = inject(ChatService);
  $messages = computed(() => this.chatService.$messages());
  $loadingDone = computed(() => this.chatService.$loadingDone());
}
