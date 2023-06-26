import { Injectable, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  router = inject(Router);
  $token = signal(localStorage.getItem("harmony-token") || "");

  constructor() {
    effect(() => {
      if (!this.$token()) {
        localStorage.removeItem("harmony-token");
      }
    });
  }

  saveToken(token: string) {
    this.$token.set(token);
    localStorage.setItem("harmony-token", token);
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
