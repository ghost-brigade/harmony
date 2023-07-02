import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const NEW_SERVER_ANIMATION = [
  trigger("createServer", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.3s ease-in-out")]),
  ]),
];
