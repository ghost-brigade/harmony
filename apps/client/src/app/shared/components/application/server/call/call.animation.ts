import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const CALL_ANIMATION = [
  trigger("call", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.3s ease-in-out")]),
  ]),
];
