import { Injectable, WritableSignal, signal } from "@angular/core";
import { ToastKind } from "./toast.model";
import { I18nKey } from "../../constants/i18n.constants";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  visible = signal(false);
  message: WritableSignal<I18nKey> = signal("EMPTY");
  type: WritableSignal<ToastKind> = signal("info");
  delay: WritableSignal<number> = signal(5000);

  show(config: { message: I18nKey; type: ToastKind; delay?: number }) {
    this.message.set(config.message);
    this.type.set(config.type);
    this.visible.set(true);
    this.delay.set(config.delay || 5000);
  }

  dismiss() {
    this.visible.set(false);
  }
}
