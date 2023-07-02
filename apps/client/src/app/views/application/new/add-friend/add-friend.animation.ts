import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const ADD_FRIEND_ANIMATION = [
  trigger("addFriend", [
    state(
      "void",
      style({
        opacity: 0,
      })
    ),
    transition("* => *", [animate("0.3s ease-in-out")]),
  ]),
];
