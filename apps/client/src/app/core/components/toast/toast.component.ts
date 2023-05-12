import { Component, computed, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastService } from "./toast.service";
import { I18nPipe } from "../../pipes/i18n.pipe";
import { TOAST_ANIMATION } from "./toast.animation";

@Component({
  selector: "harmony-core-toast",
  standalone: true,
  animations: TOAST_ANIMATION,
  imports: [CommonModule, I18nPipe],
  templateUrl: "./toast.component.html",
})
export class ToastComponent {
  message = computed(() => this.toastService.message());
  visible = computed(() => this.toastService.visible());
  type = computed(() => this.toastService.type());
  delay = computed(() => this.toastService.delay());
  timeout = -1;

  constructor(private toastService: ToastService) {
    effect(() => {
      if (this.toastService.visible()) {
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.dismiss();
        }, this.delay());
      }
    });
  }

  dismiss() {
    this.toastService.dismiss();
  }
}
