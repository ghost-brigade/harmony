import { Component } from "@angular/core";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";
import { LogoComponent } from "../../../../core/components/logo/logo.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "harmony-home-navbar",
  standalone: true,
  imports: [I18nPipe, LogoComponent, RouterLink],
  templateUrl: "./navbar.component.html",
})
export class HomeNavbarComponent {}
