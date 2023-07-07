import { Component, Input } from "@angular/core";

@Component({
  selector: "harmony-core-logo",
  standalone: true,
  imports: [],
  templateUrl: "./logo.component.html",
})
export class LogoComponent {
  @Input() mainClasses = "h-10 w-10";
}
