import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";

@Component({
  selector: "harmony-settings-appearance",
  standalone: true,
  imports: [CommonModule, SettingsNavbarComponent],
  templateUrl: "./settings-appearance.component.html",
  styleUrls: ["./settings-appearance.component.css"],
})
export class SettingsAppearanceComponent {}
