import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo/logo.component";

@Component({
  selector: "harmony-login",
  standalone: true,
  imports: [CommonModule, I18nPipe, LogoComponent],
  templateUrl: "./login.component.html",
})
export class LoginComponent {}
