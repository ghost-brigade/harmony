import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeNavbarComponent } from "../../shared/components/home/navbar/navbar.component";
import { I18nPipe } from "../../core/pipes/i18n.pipe";
import { HomeFooterComponent } from "../../shared/components/home/footer/footer.component";
import { AlertService } from "../../core/components/alert/alert.service";
import { ToastService } from "../../core/components/toast/toast.service";

@Component({
  selector: "harmony-home",
  standalone: true,
  imports: [CommonModule, HomeNavbarComponent, HomeFooterComponent, I18nPipe],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  constructor(private loaderService: ToastService) {}

  openLoader() {
    this.loaderService.show({
      message: "APP_NAME",
      type: "success",
    });
  }
}
