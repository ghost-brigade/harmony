import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";

@Component({
  selector: "harmony-home-navbar",
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: "./navbar.component.html",
})
export class HomeNavbarComponent {}
