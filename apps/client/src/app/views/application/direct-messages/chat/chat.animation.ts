import { trigger, transition, style, animate } from "@angular/animations";

export const CHAT_ANIMATIONS = [
  trigger("chat", [
    transition(":enter", [
      style({ transform: "translateX(100vw)" }),
      animate("200ms ease-in", style({ transform: "translateX(0)" })),
    ]),
    transition(":leave", [
      style({ transform: "translateX(0vw)" }),
      animate("300ms ease-out", style({ transform: "translateX(100vw)" })),
    ]),
  ]),
];
