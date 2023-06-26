import { Injectable, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  router = inject(Router);
  $token = signal("");

  constructor() {
    effect(() => {
      if (this.$token()) {
        localStorage.setItem("harmony-token", this.$token());
      } else {
        localStorage.removeItem("harmony-token");
      }
    });
  }

  saveToken(token: string) {
    this.$token.set(token);
  }

  removeToken() {
    this.$token.set("");
  }

  login() {
    this.router.navigate(["/app"]);
  }

  logout() {
    this.removeToken();
    this.router.navigate(["/login"]);
  }
}
