import { Component, computed, inject, signal } from "@angular/core";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo.component";
import { FormsModule } from "@angular/forms";
import { RequestService } from "../../core/services/request.service";
import { PostEndpoint } from "../../core/constants/endpoints/post.constants";
import { RouterLink } from "@angular/router";
import { AlertService } from "../../core/components/alert/alert.service";
import { LoaderService } from "../../core/components/loader/loader.service";
import { finalize } from "rxjs";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "harmony-login",
  standalone: true,
  imports: [I18nPipe, LogoComponent, FormsModule, RouterLink],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  authService = inject(AuthService);
  alertService = inject(AlertService);
  email = signal("");
  password = signal("");
  rememberMe = signal(false);
  btnDisabled = computed(() => {
    return !this.email() || !this.password();
  });

  login() {
    this.alertService.dismiss();
    this.loaderService.show();
    this.requestService
      .post({
        endpoint: PostEndpoint.Login,
        body: {
          email: this.email(),
          password: this.password(),
        },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          this.authService.$token.set(res.access_token);
          if (this.rememberMe()) {
            this.authService.saveToken(res.access_token);
          }
          this.authService.login();
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }
}
