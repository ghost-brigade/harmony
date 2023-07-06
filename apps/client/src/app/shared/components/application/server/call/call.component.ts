import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { SocketService } from "../../../../services/socket.service";

@Component({
  selector: "harmony-call",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
})
export class CallComponent {
  serverService = inject(ServerService);
  socketService = inject(SocketService);

  endCall() {
    this.socketService.joinChannel(this.serverService.$activeChannel());
    this.serverService.setActiveChannel(this.serverService.$activeChannel());
    this.serverService.getChannelMessages(this.serverService.$activeChannel());
    this.serverService.$isChannelListOpen.set(false);
    this.serverService.closeCall();
  }
}
