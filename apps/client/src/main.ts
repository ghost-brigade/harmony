import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";
import {
  withEnabledBlockingInitialNavigation,
  provideRouter,
} from "@angular/router";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
}).catch((err) => console.error(err));
