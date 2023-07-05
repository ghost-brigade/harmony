import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { AvatarComponent } from "../avatar/avatar.component";
import { MessageGetType } from "@harmony/zod";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { IMAGE_ANIMATION } from "./image.animation";

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
  selectedImage = "";
  style = "opacity-0";

  setSelectedImage(image: string) {
    this.selectedImage = image;
  }
  addOpacity() {
    this.style = "opacity-100";
  }
}
