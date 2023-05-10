import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeNavbarComponent } from "../../shared/components/home/navbar/navbar.component";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { HomeFooterComponent } from "../../shared/components/home/footer/footer.component";
import { LoaderService } from "../../core/components/loader/loader.service";

@Component({
  selector: "harmony-home",
  standalone: true,
  imports: [CommonModule, HomeNavbarComponent, HomeFooterComponent, I18nPipe],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  constructor(private loaderService: LoaderService) {}

  openLoader() {
    this.loaderService.show();
  }
}
