import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "harmony-server-navbar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./server-navbar.component.html",
  styleUrls: ["./server-navbar.component.css"],
})
export class ServerNavbarComponent {
  @Input() channel = "";
}
