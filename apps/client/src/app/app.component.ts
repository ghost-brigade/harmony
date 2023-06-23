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
import { SplashScreen } from "@capacitor/splash-screen";
import { BottomNavComponent } from "./shared/components/application/bottom-nav/bottom-nav.component";
import { ROUTE_TRANSITIONS } from "./route-transitions.animation";

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
  animations: ROUTE_TRANSITIONS,
})
export class AppComponent implements OnInit {
  i18nService = inject(I18nService);

  ngOnInit() {
    this.i18nService.getUserLanguage();
    setBackForwardNavigationGestures(true);
    setWebviewBounce(true);
    if (Capacitor.getPlatform() === "android") this.registerAndroidListener();
    SplashScreen.hide();
  }

  registerAndroidListener() {
    App.addListener("backButton", (data) => {
      if (data.canGoBack) window.history.back();
      else App.exitApp();
    });
  }

  getAnimationState(outlet: RouterOutlet) {
    return outlet.activatedRouteData["animation"];
  }
}
