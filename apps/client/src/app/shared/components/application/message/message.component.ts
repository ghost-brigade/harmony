import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: "harmony-message",
  standalone: true,
  imports: [CommonModule, MarkdownModule, AvatarComponent],
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"],
})
export class MessageComponent {
  @Input() message: { author: string; content: string; date: string | Date } = {
    author: "John Doe",
    content: "Hello World!",
    date: "2021-01-01",
  };
}
