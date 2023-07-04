import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { AvatarComponent } from "../avatar/avatar.component";
import { MessageGetType } from "@harmony/zod";

@Component({
  selector: "harmony-message",
  standalone: true,
  imports: [CommonModule, MarkdownModule, AvatarComponent],
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"],
})
export class MessageComponent {
  @Input() message!: MessageGetType;
}
