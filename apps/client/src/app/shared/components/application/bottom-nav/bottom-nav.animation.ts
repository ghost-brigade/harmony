import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const BOTTOM_NAV_ANIMATION = [
  trigger("swap", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition(":enter", [animate("0.3s 0.3s")]),
  ]),
  trigger("bottomNav", [
    state("void", style({ height: 0, opacity: 0 })),
    state("*", style({ height: "*", opacity: 1 })),
    transition(":enter", animate("200ms ease-in-out")),
    transition(":leave", animate("400ms ease-in-out")),
  ]),
];
