import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePopService } from "./profile-pop.service";

@Component({
  selector: "harmony-profile-pop",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile-pop.component.html",
  styleUrls: ["./profile-pop.component.css"],
})
export class ProfilePopComponent {
  profilePopService = inject(ProfilePopService);
  $open = computed(() => this.profilePopService.$isOpen());
}
