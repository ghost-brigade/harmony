import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const IMAGE_ANIMATION = [
  trigger("image", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.3s ease-in-out")]),
  ]),
];
