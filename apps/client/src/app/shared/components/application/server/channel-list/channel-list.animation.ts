import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const CHANNEL_LIST_ANIMATION = [
  trigger("channelList", [
    transition(":enter", [
      style({ transform: "translateX(-100%)" }),
      animate("250ms ease-in", style({ transform: "translateX(0%)" })),
    ]),
    transition(":leave", [
      animate("250ms ease-out", style({ transform: "translateX(-100%)" })),
    ]),
  ]),
  trigger("backdrop", [
    state("void", style({ opacity: 0 })),
    transition(":enter", [
      animate("200ms 100ms ease-in", style({ opacity: 1 })),
    ]),
    transition(":leave", [
      animate("200ms 100ms ease-out", style({ opacity: 0 })),
    ]),
  ]),
];
