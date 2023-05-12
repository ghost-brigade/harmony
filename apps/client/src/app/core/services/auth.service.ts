import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = signal("");

  constructor() {
    effect(() => {
      if(this.token()) {
        localStorage.setItem("harmony-token", this.token());
      } else {
        localStorage.removeItem("harmony-token");
      }
    });
  }

  saveToken(token: string) {
    this.token.set(token);
  }

  removeToken() {
    this.token.set("");
  }
}
