import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../../../core/components/logo/logo/logo.component";

@Component({
  selector: "harmony-home-navbar",
  standalone: true,
  imports: [CommonModule, I18nPipe, LogoComponent],
  templateUrl: "./navbar.component.html",
})
export class HomeNavbarComponent {}
