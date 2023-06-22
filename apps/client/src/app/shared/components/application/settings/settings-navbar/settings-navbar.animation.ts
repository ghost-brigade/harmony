import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const SETTINGS_NAV_ANIMATION = [
  trigger("settingsNav", [
    state("void", style({ height: 0, opacity: 0 })),
    state("*", style({ height: "*", opacity: 1 })),
    transition(":enter", animate("200ms ease-in-out")),
    transition(":leave", animate("400ms ease-in-out")),
  ]),
];
