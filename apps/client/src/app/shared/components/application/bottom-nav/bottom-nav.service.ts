import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BottomNavService {
  $isTextChannel = signal(true);

  /**
   * Show the message bar
   */
  showMessageBar(): void {
    this.$isTextChannel.set(true);
  }

  /**
   * Hide the message bar
   */
  hideMessageBar(): void {
    this.$isTextChannel.set(false);
  }
}
