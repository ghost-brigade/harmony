import { Component, Input, inject } from "@angular/core";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";

@Component({
  selector: "harmony-server-navbar",
  standalone: true,
  imports: [],
  templateUrl: "./server-navbar.component.html",
  styleUrls: ["./server-navbar.component.css"],
})
export class ServerNavbarComponent {
  @Input() channel = "";

  serverService = inject(ServerService);

  openChannelList() {
    this.serverService.openChannelList();
  }

  openUserList() {
    this.serverService.openUserList();
  }
}
