import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { I18nService } from "./core/services/i18n.service";
import { LoaderComponent } from "./core/components/loader/loader.component";
import { AlertComponent } from "./core/components/alert/alert.component";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import {
  setBackForwardNavigationGestures,
  setWebviewBounce,
} from "capacitor-plugin-ios-webview-configurator";
import { ToastComponent } from "./core/components/toast/toast.component";
import { BottomNavComponent } from "./shared/components/application/bottom-nav/bottom-nav.component";

@Component({
  selector: "harmony-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    AlertComponent,
    ToastComponent,
    BottomNavComponent,
  ],
})
export class AppComponent implements OnInit {
  i18nService = inject(I18nService);

  ngOnInit() {
    this.i18nService.getUserLanguage();
    setBackForwardNavigationGestures(true);
    setWebviewBounce(true);
    if (Capacitor.getPlatform() === "android") this.registerAndroidListener();
  }

  registerAndroidListener() {
    App.addListener("backButton", (data) => {
      if (data.canGoBack) window.history.back();
      else App.exitApp();
    });
  }
}
