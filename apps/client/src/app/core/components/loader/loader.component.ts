import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LOADER_ANIMATION } from "./loader.animation";
import { LoaderService } from "./loader.service";

@Component({
  selector: "harmony-core-loader",
  standalone: true,
  imports: [CommonModule],
  animations: LOADER_ANIMATION,
  templateUrl: "./loader.component.html",
})
export class LoaderComponent {
  loaderService = inject(LoaderService);

  $isOpen = computed(() => this.loaderService.$isOpen());
}
