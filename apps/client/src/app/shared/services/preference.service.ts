import { Injectable, effect, signal } from "@angular/core";
import { I18N_CONSTANTS } from "../../core/constants/i18n.constants";

type Preferences = {
  theme: "system" | "light" | "dark";
  language: keyof typeof I18N_CONSTANTS;
};

@Injectable({
  providedIn: "root",
})
export class PreferenceService {
  $preferences = signal<Partial<Preferences>>(
    JSON.parse(localStorage.getItem("harmony-preferences") || "{}")
  );
  private mediaMatcher: MediaQueryList;

  constructor() {
    this.mediaMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    this.mediaMatcher.addEventListener(
      "change",
      this.matchMediaListener.bind(this)
    );
    effect(() => {
      if (this.$preferences()) {
        localStorage.setItem(
          "harmony-preferences",
          JSON.stringify(this.$preferences())
        );
      }
      this.updateTheme();
    });
  }

  savePreferences(preferences: Partial<Preferences>) {
    this.$preferences.set({
      ...this.$preferences(),
      ...preferences,
    });
  }

  private matchMediaListener() {
    if (this.$preferences().theme === "system" || !this.$preferences().theme) {
      this.updateTheme();
    }
  }

  private updateTheme() {
    document.documentElement.classList.remove("system", "light", "dark");
    if (this.$preferences().theme === "system" || !this.$preferences().theme) {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.add(
        this.$preferences().theme || "light"
      );
    }
  }

  setTheme(theme: Preferences["theme"]) {
    this.savePreferences({ theme });
  }
}
