import { Injectable, WritableSignal, signal } from "@angular/core";
import { UserType } from "@harmony/zod";

@Injectable({
  providedIn: "root",
})
export class ProfilePopService {
  $isOpen = signal(false);
  $user: WritableSignal<UserType | undefined> = signal(undefined);

  open(user: UserType) {
    this.$user.set(user);
    this.$isOpen.set(true);
  }

  close() {
    this.$user.set(undefined);
    this.$isOpen.set(false);
  }
}
