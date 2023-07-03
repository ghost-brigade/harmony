import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const ROUTE_TRANSITIONS = [
  trigger("routeTransition", [
    transition(
      "HomePage => SettingsPage, DirectMessagesPage => SettingsPage, NewPage => SettingsPage, SearchPage => SettingsPage",
      [
        query(
          ":enter",
          style({
            position: "absolute",
            width: "100%",
            left: 0,
            transform: "translateY(calc(100vh))",
          }),
          { optional: true }
        ),
        group([
          query(
            ":enter",
            [
              style({ transform: "translateY(100vh)" }),
              animate("0.3s ease-in", style({ transform: "translateY(0)" })),
            ],
            { optional: true }
          ),
          query(":leave", [animate("300ms ease-out", style({ opacity: 0 }))], {
            optional: true,
          }),
        ]),
      ]
    ),
    transition("SettingsPage => HomePage, SettingsPage => LoginPage", [
      query(
        ":leave",
        style({
          position: "fixed",
          width: "100vw",
          transform: "translateY(100vh)",
        }),
        { optional: true }
      ),
      group([
        query(
          ":leave",
          [
            style({ transform: "translateY(0)" }),
            animate("0.3s ease-in", style({ transform: "translateY(100vh)" })),
          ],
          { optional: true }
        ),
      ]),
    ]),

    transition("DirectMessagesPage => ChatPage", [
      style({ position: "relative" }),
      query(":enter", [
        style({
          position: "absolute",
          top: 0,
          right: 0,
          width: "100vw",
        }),
      ]),
      query(":enter", [style({ right: "-100vw" })]),
      group([
        query(":leave", [animate("300ms ease-out", style({ opacity: 0 }))]),
        query(":enter", [animate("300ms ease-out", style({ right: "0vw" }))]),
      ]),
    ]),
    transition(
      "ChatPage => DirectMessagesPage, * => HomePage, NewPage => DirectMessagesPage, SearchPage => DirectMessagesPage, SearchPage => NewPage, SettingsSubpage => SettingsPage, NewSubpage => NewPage",
      [
        style({ position: "relative" }),
        query(":enter, :leave", [
          style({
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
          }),
        ]),
        query(":enter", [style({ opacity: 0 })]),
        group([
          query(
            ":leave",
            [animate("300ms ease-out", style({ right: "-100vw" }))],
            { optional: true }
          ),
          query(":enter", [animate("300ms ease-in", style({ opacity: 1 }))], {
            optional: true,
          }),
        ]),
      ]
    ),

    transition(
      "HomePage => DirectMessagesPage, HomePage => ServerPage, HomePage => NewPage, HomePage => SearchPage, DirectMessagesPage => NewPage, DirectMessagesPage => SearchPage, NewPage => SearchPage, SettingsPage => SettingsSubpage",
      [
        style({ position: "relative" }),
        query(":enter, :leave", [
          style({
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
          }),
        ]),
        query(":enter", [style({ transform: "translateX(100%)" })]),
        group([
          query(":leave", [animate("300ms ease-out", style({ opacity: 0 }))], {
            optional: true,
          }),
          query(
            ":enter",
            [animate("300ms ease-in", style({ transform: "translateX(0)" }))],
            {
              optional: true,
            }
          ),
        ]),
      ]
    ),
  ]),
];
