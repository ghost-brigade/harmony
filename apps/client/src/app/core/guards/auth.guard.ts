import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService);
  if (authService.$token()) {
    // token in localStorage
    if (authService.$token()) {
      const { exp } = JSON.parse(atob(authService.$token().split(".")[1]));
      // invalid token
      if (!exp) {
        authService.logout();
        return false;
      } else if (Math.floor(new Date().getTime() / 1000) < exp) {
        return true;
      }
    }
    // no token in localStorage
    if (!state.url.startsWith("/app")) {
      authService.removeToken();
      return true;
    }
    authService.logout();
    return false;
  }

  authService.logout();
  return false;
};
