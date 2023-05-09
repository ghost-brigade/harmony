import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const LOADER_ANIMATION = [
  trigger("loader", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.1s ease-in-out")]),
  ]),
];
