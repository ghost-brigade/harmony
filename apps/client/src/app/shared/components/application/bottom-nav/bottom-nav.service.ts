import { Injectable, signal } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BottomNavService {
  $showBottomNav = signal(false);
  $currentRoute = signal("");
  $isTextChannel = signal(false);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getLeafRoute(this.activatedRoute);
        route.url.subscribe((url) => {
          this.$currentRoute.set(url[0]?.path || "");
        });
        route.data.subscribe((data) => {
          this.$isTextChannel.set(data["isText"] || false);
          this.$showBottomNav.set(data["showBottomNav"] || false);
        });
      });
  }

  getLeafRoute(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getLeafRoute(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

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

  /**
   * Show the bottom nav
   */
  showBottomNav(): void {
    this.$showBottomNav.set(true);
  }

  /**
   * Hide the bottom nav
   */
  hideBottomNav(): void {
    this.$showBottomNav.set(false);
  }
}