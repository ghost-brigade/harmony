import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";
import { PreferenceService } from "apps/client/src/app/shared/services/preference.service";
import { FormsModule } from "@angular/forms";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";
import {
  I18N_CONSTANTS,
  I18nKey,
} from "apps/client/src/app/core/constants/i18n.constants";
import { I18nService } from "apps/client/src/app/core/services/i18n.service";

@Component({
  selector: "harmony-settings-appearance",
  standalone: true,
  imports: [CommonModule, SettingsNavbarComponent, FormsModule, I18nPipe],
  templateUrl: "./settings-appearance.component.html",
  styleUrls: ["./settings-appearance.component.css"],
})
export class SettingsAppearanceComponent {
  preferenceService = inject(PreferenceService);
  i18nService = inject(I18nService);
  selectedLanguage = this.preferenceService.$preferences().language || "en-US";
  selectedTheme = this.preferenceService.$preferences().theme || "system";
  languages = Object.keys(I18N_CONSTANTS) as I18nKey[];

  onThemeChange() {
    this.preferenceService.savePreferences({ theme: this.selectedTheme });
  }

  onLanguageChange() {
    this.i18nService.language.set(this.selectedLanguage);
    this.preferenceService.savePreferences({ language: this.selectedLanguage });
  }
}
