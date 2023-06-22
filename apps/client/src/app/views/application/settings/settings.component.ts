import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BottomNavComponent } from "../../../shared/components/application/bottom-nav/bottom-nav.component";
import { RouterLink } from "@angular/router";
import { SettingsNavbarComponent } from "../../../shared/components/application/settings/settings-navbar/settings-navbar.component";

@Component({
  selector: "harmony-settings",
  standalone: true,
  imports: [
    CommonModule,
    BottomNavComponent,
    RouterLink,
    SettingsNavbarComponent,
  ],
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent {}
