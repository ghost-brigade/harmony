import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const BADGE_ANIMATION = [
  trigger("badge", [
    transition(":enter", [
      animate(
        "300ms ease-in-out",
        keyframes([
          style({ transform: "scale(0)" }),
          style({ transform: "scale(1.1)" }),
          style({ transform: "scale(1)" }),
        ])
      ),
    ]),
    transition(":leave", [
      animate(
        "300ms ease-in-out",
        keyframes([
          style({ transform: "scale(1)" }),
          style({ transform: "scale(1.1)" }),
          style({ transform: "scale(0)" }),
        ])
      ),
    ]),
  ]),
];
