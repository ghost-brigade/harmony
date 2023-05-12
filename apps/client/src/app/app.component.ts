import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { I18nService } from "./core/services/i18n.service";
import { LoaderComponent } from "./core/components/loader/loader.component";
import { AlertComponent } from "./core/components/alert/alert.component";

@Component({
  selector: "harmony-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, AlertComponent],
})
export class AppComponent implements OnInit {
  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.i18nService.getUserLanguage();
  }
}
