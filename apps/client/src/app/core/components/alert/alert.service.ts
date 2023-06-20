import { Injectable, WritableSignal, signal } from "@angular/core";
import { I18nKey } from "../../constants/i18n.constants";
import { AlertKind } from "./alert.model";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  $visible = signal(false);
  $message: WritableSignal<I18nKey> = signal("EMPTY");
  $type: WritableSignal<AlertKind> = signal("info");

  show(config: { message: I18nKey; type: AlertKind }) {
    this.$message.set(config.message);
    this.$type.set(config.type);
    this.$visible.set(true);
  }

  dismiss() {
    this.$visible.set(false);
  }
}
