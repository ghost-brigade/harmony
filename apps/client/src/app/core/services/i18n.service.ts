import { Injectable, signal } from "@angular/core";
import { I18N_CONSTANTS, I18nConstants } from "../constants/i18n.constants";

@Injectable({
  providedIn: "root",
})
export class I18nService {
  language = signal("en-US");

  getUserLanguage() {
    const userLanguage =
      localStorage.getItem("harmony-language") ||
      window.navigator.language ||
      "en-US";

    if (!(I18N_CONSTANTS as I18nConstants)[userLanguage]) {
      this.language.set("en-US");
    } else {
      this.language.set(userLanguage);
    }
  }

  getTranslation(key: string) {
    return (I18N_CONSTANTS as I18nConstants)[this.language()][key] || key;
  }
}
