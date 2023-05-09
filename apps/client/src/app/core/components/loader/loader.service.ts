import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  $isOpen = signal(false);

  /**
   * Show the loader
   */
  show(): void {
    this.$isOpen.set(true);
  }

  /**
   * Hide the loader
   */
  hide(): void {
    this.$isOpen.set(false);
  }
}
