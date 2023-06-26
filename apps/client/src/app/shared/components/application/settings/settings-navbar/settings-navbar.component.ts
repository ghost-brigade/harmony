import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SETTINGS_NAV_ANIMATION } from "./settings-navbar.animation";
import { RouterLink } from "@angular/router";

@Component({
  selector: "harmony-settings-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./settings-navbar.component.html",
  styleUrls: ["./settings-navbar.component.css"],
  animations: SETTINGS_NAV_ANIMATION,
})
export class SettingsNavbarComponent {
  @Input() backUrl = "/app";
  @Input() title = "Settings";
}
