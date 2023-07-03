import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "harmony-server-icon",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./server-icon.component.html",
})
export class ServerIconComponent {
  @Input() image: string | undefined = "";
  @Input() title = "";
  @Input() size = "h-8 w-8";
}
