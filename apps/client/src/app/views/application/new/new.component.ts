import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { NewServerService } from "./new-server/new-server.service";
import { NewServerComponent } from "./new-server/new-server.component";

@Component({
  selector: "harmony-new",
  standalone: true,
  imports: [CommonModule, NgAutoAnimateDirective, NewServerComponent],
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
})
export class NewComponent {
  newServerService = inject(NewServerService);

  openNewServer() {
    this.newServerService.open();
  }
}
