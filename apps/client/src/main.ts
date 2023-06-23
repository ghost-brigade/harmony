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
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      MarkdownModule.forRoot({
        markedOptions: {
          provide: MarkedOptions,
          useValue: {
            gfm: true,
            breaks: false,
            pedantic: false,
            smartLists: true,
            smartypants: false,
          },
        },
      })
    ),
  ],
}).catch((err) => console.error(err));
defineCustomElements(window);
