import { Component, computed, inject, signal } from "@angular/core";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo.component";
import { FormsModule } from "@angular/forms";
import { RequestService } from "../../core/services/request.service";
import { PostEndpoint } from "../../core/constants/endpoints/post.constants";
import { RouterLink } from "@angular/router";

@Component({
  selector: "harmony-login",
  standalone: true,
  imports: [I18nPipe, LogoComponent, FormsModule, RouterLink],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  requestService = inject(RequestService);
  email = signal("");
  password = signal("");
  rememberMe = signal(false);
  btnDisabled = computed(() => {
    return !this.email() || !this.password();
  });

  login() {
    this.requestService
      .post({
        endpoint: PostEndpoint.Login,
        body: {
          email: this.email(),
          password: this.password(),
        },
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
