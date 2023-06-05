import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "",
    loadComponent: () =>
      import("./views/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./views/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "signup",
    loadComponent: () =>
      import("./views/signup/signup.component").then((m) => m.SignupComponent),
  },
  {
    path: "about",
    loadComponent: () =>
      import("./views/about/about.component").then((m) => m.AboutComponent),
  },
  {
    path: "terms",
    loadComponent: () =>
      import("./views/terms/terms.component").then((m) => m.TermsComponent),
  },
  {
    path: "privacy",
    loadComponent: () =>
      import("./views/privacy/privacy.component").then(
        (m) => m.PrivacyComponent
      ),
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./views/contact/contact.component").then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./views/not-found/not-found.component").then(
        (m) => m.NotFoundComponent
      ),
  },
];
