import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo.component";
import { Router, RouterModule } from "@angular/router";
import { LoaderService } from "../../core/components/loader/loader.service";
import { RequestService } from "../../core/services/request.service";
import { PostEndpoint } from "../../core/constants/endpoints/post.constants";
import { finalize } from "rxjs";
import { AlertService } from "../../core/components/alert/alert.service";

@Component({
  selector: "harmony-signup",
  standalone: true,
  imports: [I18nPipe, FormsModule, LogoComponent, RouterModule],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
  loaderService = inject(LoaderService);
  alertService = inject(AlertService);
  requestService = inject(RequestService);
  router = inject(Router);
  $email = signal("");
  $username = signal("");
  $password = signal("");
  $confirmPassword = signal("");
  $acceptTerms = signal(false);
  $passwordMatch = computed(() => {
    if (this.$confirmPassword() && this.$password()) {
      return this.$password() === this.$confirmPassword();
    }
    return true;
  });

  btnDisabled = computed(() => {
    return (
      !this.$email() ||
      !this.$username() ||
      !this.$password() ||
      !this.$confirmPassword() ||
      !this.$acceptTerms() ||
      !this.$passwordMatch()
    );
  });

  register() {
    this.alertService.dismiss();
    this.loaderService.show();
    this.requestService
      .post({
        endpoint: PostEndpoint.Register,
        body: {
          email: this.$email(),
          username: this.$username(),
          password: this.$password(),
        },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: () => {
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.log(err);
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }
}
