import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../core/pipes/i18n.pipe";

@Component({
  selector: "harmony-login",
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: "./login.component.html",
})
export class LoginComponent {}
