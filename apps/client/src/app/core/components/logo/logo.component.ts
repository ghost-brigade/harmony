import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "harmony-core-logo",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./logo.component.html",
})
export class LogoComponent {
  @Input() mainClasses = "h-10 w-10";
}
