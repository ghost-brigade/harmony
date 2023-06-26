import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "harmony-avatar",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./avatar.component.html",
})
export class AvatarComponent {
  @Input() image = "";
  @Input() status: "" | "green" | "red" | "orange" = "";
  @Input() size = "h-10 w-10";
}
