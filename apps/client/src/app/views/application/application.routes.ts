import { Route } from "@angular/router";

export default [
  {
    path: "",
    loadComponent: () =>
      import("./application.component").then((m) => m.ApplicationComponent),
    data: { showBottomNav: true, animation: "HomePage" },
  },
  {
    path: "search",
    loadComponent: () =>
      import("./search/search.component").then((m) => m.SearchComponent),
    data: { showBottomNav: true, animation: "SearchPage" },
  },
  {
    path: "new",
    loadComponent: () =>
      import("./new/new.component").then((m) => m.NewComponent),

    data: { showBottomNav: true, animation: "NewPage" },
  },
  {
    path: "dms",
    loadComponent: () =>
      import("./direct-messages/direct-messages.component").then(
        (m) => m.DirectMessagesComponent
      ),
    data: { showBottomNav: true, animation: "DirectMessagesPage" },
  },
  {
    path: "dms/:id",
    loadComponent: () =>
      import("./direct-messages/chat/chat.component").then(
        (m) => m.ChatComponent
      ),
    data: { showBottomNav: true, isText: true, animation: "ChatPage" },
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./settings/settings.component").then((m) => m.SettingsComponent),
    data: { animation: "SettingsPage" },
  },
  {
    path: "settings/profile",
    loadComponent: () =>
      import("./settings/settings-profile/settings-profile.component").then(
        (m) => m.SettingsProfileComponent
      ),
    data: { animation: "SettingsSubpage" },
  },
  {
    path: "settings/appearance",
    loadComponent: () =>
      import(
        "./settings/settings-appearance/settings-appearance.component"
      ).then((m) => m.SettingsAppearanceComponent),
    data: { animation: "SettingsSubpage" },
  },
  {
    path: "new/server",
    loadComponent: () =>
      import("./new/new-server/new-server.component").then(
        (m) => m.NewServerComponent
      ),
    data: { animation: "NewSubpage" },
  },
] as Route[];
