import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";

@Component({
  selector: "harmony-settings-profile",
  standalone: true,
  imports: [CommonModule, SettingsNavbarComponent],
  templateUrl: "./settings-profile.component.html",
  styleUrls: ["./settings-profile.component.css"],
})
export class SettingsProfileComponent {}
