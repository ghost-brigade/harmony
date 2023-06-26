import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const UPDATE_PASSWORD_ANIMATION = [
  trigger("updatePassword", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.3s ease-in-out")]),
  ]),
];
