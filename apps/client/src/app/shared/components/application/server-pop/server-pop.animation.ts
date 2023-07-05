import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const MESSAGE_POP_ANIMATION = [
  trigger("backdrop", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.3s ease-in-out")]),
  ]),
];
