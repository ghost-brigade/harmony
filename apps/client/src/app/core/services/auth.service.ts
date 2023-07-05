import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  router = inject(Router);
  $token = signal(localStorage.getItem("harmony-token") || "");
  $userId = computed(() => {
    if (this.$token()) {
      const token = this.$token().split(".")[1];
      const user = JSON.parse(atob(token));
      return user.sub;
    }
    return "";
  });

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
    setTimeout(() => {
      if (!this.router.routerState.snapshot.url.startsWith("/app")) {
        this.router.navigate(["/app"]);
      }
    });
  }

  logout() {
    this.removeToken();
    this.router.navigate(["/login"]);
  }
}
