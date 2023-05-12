import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "harmony-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, AlertComponent, ToastComponent],
})
export class AppComponent implements OnInit {
  constructor(private i18nService: I18nService) {}

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
