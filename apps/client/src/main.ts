import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";
import {
  withEnabledBlockingInitialNavigation,
  provideRouter,
} from "@angular/router";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
}).catch((err) => console.error(err));
