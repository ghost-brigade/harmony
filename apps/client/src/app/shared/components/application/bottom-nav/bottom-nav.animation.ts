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
];
