import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BottomNavComponent } from "../../shared/components/application/bottom-nav/bottom-nav.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "harmony-application",
  standalone: true,
  imports: [CommonModule, BottomNavComponent, RouterModule],
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.css"],
})
export class ApplicationComponent {}
