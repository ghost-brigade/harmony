import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo/logo.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "harmony-login",
  standalone: true,
  imports: [CommonModule, I18nPipe, LogoComponent, FormsModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  email = signal("");
  password = signal("");
  rememberMe = signal(false);
}
