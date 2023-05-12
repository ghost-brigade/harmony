import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";
import { RouterModule } from "@angular/router";

@Component({
  selector: "harmony-home-footer",
  standalone: true,
  imports: [CommonModule, I18nPipe, RouterModule],
  templateUrl: "./footer.component.html",
})
export class HomeFooterComponent {}
