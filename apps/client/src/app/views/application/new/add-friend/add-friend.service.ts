import { Injectable, signal } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AddFriendService {
  $open = signal(false);

  open() {
    this.$open.set(true);
    document.body.style.overflow = "hidden";
  }

  close() {
    this.$open.set(false);
    document.body.style.overflow = "auto";
  }
}
