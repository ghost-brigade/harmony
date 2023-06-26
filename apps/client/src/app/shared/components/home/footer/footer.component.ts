import { Component } from "@angular/core";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";
import { RouterLink } from "@angular/router";

@Component({
  selector: "harmony-home-footer",
  standalone: true,
  imports: [I18nPipe, RouterLink],
  templateUrl: "./footer.component.html",
})
export class HomeFooterComponent {}
