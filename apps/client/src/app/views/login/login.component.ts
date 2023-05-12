import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../core/components/logo/logo.component";
import { FormsModule } from "@angular/forms";
import { RequestService } from "../../core/services/request.service";
import { PostEndpoint } from "../../core/constants/endpoints/post.constants";
import { RouterModule } from "@angular/router";

@Component({
  selector: "harmony-login",
  standalone: true,
  imports: [CommonModule, I18nPipe, LogoComponent, FormsModule, RouterModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  email = signal("");
  password = signal("");
  rememberMe = signal(false);
  constructor(private requestService: RequestService) {}

  login() {
    this.requestService.post({
      endpoint: PostEndpoint.Login,
      body: {
        email: this.email(),
        password: this.password(),
      },
    });
  }
}
