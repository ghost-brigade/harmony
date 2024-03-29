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
import { MarkdownModule, MarkedOptions, MarkedRenderer } from "ngx-markdown";
import { GLOBAL_AUTO_ANIMATE_OPTIONS } from "ng-auto-animate";

const renderer = new MarkedRenderer();
renderer.image = (href: string, title: string, text: string) => {
  return `![${text}](${href})`;
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: GLOBAL_AUTO_ANIMATE_OPTIONS,
      useValue: {
        duration: 300,
        easing: "ease-in-out",
      },
    },
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
            renderer,
          },
        },
      })
    ),
  ],
}).catch((err) => console.error(err));
defineCustomElements(window);
