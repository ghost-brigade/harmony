import { Component } from "@angular/core";
import { HomeNavbarComponent } from "../../shared/components/home/navbar/navbar.component";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { HomeFooterComponent } from "../../shared/components/home/footer/footer.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "harmony-home",
  standalone: true,
  imports: [HomeNavbarComponent, HomeFooterComponent, I18nPipe, RouterLink],
  templateUrl: "./home.component.html",
})
export class HomeComponent {}
