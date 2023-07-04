import { Component, Input, WritableSignal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerGetType } from "@harmony/zod";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { SocketService } from "../../../../services/socket.service";
import { USER_LIST_ANIMATION } from "./user-list.animation";
import { AvatarComponent } from "../../avatar/avatar.component";

@Component({
  selector: "harmony-user-list",
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
  animations: USER_LIST_ANIMATION,
})
export class UserListComponent {
  @Input() server!: ServerGetType | null;
  @Input() isOpen = false;
  serverService = inject(ServerService);
  socketService = inject(SocketService);

  closeUserList() {
    this.serverService.closeUserList();
  }

  clickVoiceChannel(channel: string) {
    const foundChannel = this.server?.channels?.find((c) => c.id === channel);
    if (foundChannel?.type === "VOICE") {
      this.serverService.openCall();
    }
  }
}
