import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { AvatarComponent } from "../avatar/avatar.component";
import { MessageGetType } from "@harmony/zod";
import { NgAutoAnimateDirective } from "ng-auto-animate";

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
})
export class MessageComponent {
  @Input() message!: MessageGetType;
  selectedImage = "";

  setSelectedImage(image: string) {
    this.selectedImage = image;
  }
}
