import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo/logo.component";

@Component({
  selector: "harmony-signup",
  standalone: true,
  imports: [CommonModule, I18nPipe, FormsModule, LogoComponent],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
  email = signal("");
  password = signal("");
  confirmPassword = signal("");
  acceptTerms = signal(false);
  passwordMatch = computed(() => {
    if (this.confirmPassword() && this.password()) {
      return this.password() === this.confirmPassword();
    }
    return true;
  });
}
