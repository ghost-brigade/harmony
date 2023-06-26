import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";
import { PreferenceService } from "apps/client/src/app/shared/services/preference.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "harmony-settings-appearance",
  standalone: true,
  imports: [CommonModule, SettingsNavbarComponent, FormsModule],
  templateUrl: "./settings-appearance.component.html",
  styleUrls: ["./settings-appearance.component.css"],
})
export class SettingsAppearanceComponent {
  preferenceService = inject(PreferenceService);
  selectedTheme = this.preferenceService.$preferences().theme || "system";

  onThemeChange() {
    this.preferenceService.savePreferences({ theme: this.selectedTheme });
  }
}
