import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo.component";
import { RouterModule } from "@angular/router";
import { LoaderService } from "../../core/components/loader/loader.service";

@Component({
  selector: "harmony-signup",
  standalone: true,
  imports: [CommonModule, I18nPipe, FormsModule, LogoComponent, RouterModule],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
  loaderService = inject(LoaderService);
  email = signal("");
  username = signal("");
  password = signal("");
  confirmPassword = signal("");
  acceptTerms = signal(false);
  passwordMatch = computed(() => {
    if (this.confirmPassword() && this.password()) {
      return this.password() === this.confirmPassword();
    }
    return true;
  });

  btnDisabled = computed(() => {
    return (
      !this.email() ||
      !this.username() ||
      !this.password() ||
      !this.confirmPassword() ||
      !this.acceptTerms() ||
      !this.passwordMatch()
    );
  });

  register() {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    }, 3000);
  }
}
