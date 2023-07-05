import { Injectable, inject } from "@angular/core";
import { io } from "socket.io-client";
import { WS_BASE_URL } from "../../core/constants/api.constants";
import { AuthService } from "../../core/services/auth.service";
import { MessageNotification } from "@harmony/notification";
import { ServerService } from "../../views/application/server/server.service";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  authService = inject(AuthService);
  serverService = inject(ServerService);
  messageSocket = io(WS_BASE_URL + "/message", {
    auth: {
      token: this.authService.$token(),
    },
  });

  constructor() {
    this.messageSocket.on("disconnect", () => {
      this.messageSocket.connect();
    });
  }
  /*
  serverSocket = io(WS_BASE_URL + "/server", {
    auth: {
      token: this.authService.$token(),
    },
  });

  globalSocker = io(WS_BASE_URL + "/global", {
    auth: {
      token: this.authService.$token(),
    },
  });
*/
  joinChannel(channelId: string) {
    console.log(this.authService.$token());
    console.log(channelId);
    this.messageSocket.emit(MessageNotification.JOIN_CHANNEL, channelId);
    this.serverService.getChannelMessages(channelId);
  }
}
