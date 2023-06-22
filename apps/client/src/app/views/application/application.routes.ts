import { Route } from "@angular/router";

export default [
  {
    path: "",
    loadComponent: () =>
      import("./application.component").then((m) => m.ApplicationComponent),
    data: { showBottomNav: true },
  },
  {
    path: "search",
    loadComponent: () =>
      import("./search/search.component").then((m) => m.SearchComponent),
    data: { showBottomNav: true },
  },
  {
    path: "new",
    loadComponent: () =>
      import("./new/new.component").then((m) => m.NewComponent),

    data: { showBottomNav: true },
  },
  {
    path: "dms",
    loadComponent: () =>
      import("./direct-messages/direct-messages.component").then(
        (m) => m.DirectMessagesComponent
      ),
    data: { showBottomNav: true },
  },
  {
    path: "dms/:id",
    loadComponent: () =>
      import("./direct-messages/chat/chat.component").then(
        (m) => m.ChatComponent
      ),
    data: { showBottomNav: true, isText: true },
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./settings/settings.component").then((m) => m.SettingsComponent),
  },
] as Route[];
