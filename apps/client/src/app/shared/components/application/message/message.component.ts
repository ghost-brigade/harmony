import { Component, Input, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { AvatarComponent } from "../avatar/avatar.component";
import { MessageGetType } from "@harmony/zod";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { IMAGE_ANIMATION } from "./image.animation";
import { AuthService } from "apps/client/src/app/core/services/auth.service";
import { ProfilePopService } from "../profile-pop/profile-pop.service";
import { MessagePopService } from "../message-pop/message-pop.service";
import { MessagePopComponent } from "../message-pop/message-pop.component";

@Component({
  selector: "harmony-message",
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    AvatarComponent,
    NgAutoAnimateDirective,
  ],
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"],
  animations: IMAGE_ANIMATION,
})
export class MessageComponent {
  @Input() message!: MessageGetType;
  authService = inject(AuthService);
  messagePopService = inject(MessagePopService);
  $isAuthor = computed(
    () => this.message.author.id === this.authService.$userId()
  );
  selectedImage = "";
  style = "opacity-0";
  longPressTimeout = -1;

  setSelectedImage(image: string) {
    this.selectedImage = image;
  }
  addOpacity() {
    this.style = "opacity-100";
  }

  editMessage() {
    this.messagePopService.open(this.message);
  }
}
