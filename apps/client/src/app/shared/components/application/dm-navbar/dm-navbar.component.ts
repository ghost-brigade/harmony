import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatService } from "apps/client/src/app/views/application/direct-messages/chat/chat.service";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: "harmony-dm-navbar",
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: "./dm-navbar.component.html",
  styleUrls: ["./dm-navbar.component.css"],
})
export class DmNavbarComponent {
  $user = computed(() => this.chatService.$user());

  chatService = inject(ChatService);

  goBack() {
    this.chatService.$user.set(undefined);
  }
}
