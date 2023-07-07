import { Component, computed, effect, inject, signal } from "@angular/core";
import { NgIf } from "@angular/common";
import { AlertService } from "./alert.service";
import { ALERT_ANIMATION } from "./alert.animation";
import { I18nPipe } from "../../pipes/i18n.pipe";
import { Router } from "@angular/router";

@Component({
  selector: "harmony-core-alert",
  standalone: true,
  animations: ALERT_ANIMATION,
  imports: [NgIf, I18nPipe],
  templateUrl: "./alert.component.html",
})
export class AlertComponent {
  $alertStyle = signal("");
  $buttonStyle = signal("");
  $message = computed(() => this.alertService.$message());
  $visible = computed(() => this.alertService.$visible());
  $type = computed(() => this.alertService.$type());
  router = inject(Router);

  constructor(private alertService: AlertService) {
    this.router.events.subscribe(() => {
      this.alertService.dismiss();
    });
    effect(
      () => {
        switch (this.alertService.$type()) {
          case "success":
            this.$alertStyle.set(
              "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
            );
            this.$buttonStyle.set(
              "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            );
            break;
          case "error":
            this.$alertStyle.set(
              "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
            );
            this.$buttonStyle.set(
              "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            );
            break;
          case "info":
            this.$alertStyle.set(
              "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            );
            this.$buttonStyle.set(
              "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            );
            break;
          case "warning":
            this.$alertStyle.set(
              "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            );
            this.$buttonStyle.set(
              "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
            );
            break;
          default:
            this.$alertStyle.set("bg-gray-50 dark:bg-gray-800");
            this.$buttonStyle.set(
              "bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            );
        }
      },
      { allowSignalWrites: true }
    );
  }

  dismiss() {
    this.alertService.dismiss();
  }
}
