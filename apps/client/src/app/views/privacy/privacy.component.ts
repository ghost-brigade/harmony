import { Component } from "@angular/core";
import { HomeNavbarComponent } from "../../shared/components/home/navbar/navbar.component";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { HomeFooterComponent } from "../../shared/components/home/footer/footer.component";

@Component({
  selector: "harmony-privacy",
  standalone: true,
  imports: [HomeNavbarComponent, HomeFooterComponent, I18nPipe],
  templateUrl: "./privacy.component.html",
})
export class PrivacyComponent {}
