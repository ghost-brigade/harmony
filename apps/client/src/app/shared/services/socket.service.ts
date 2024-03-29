import { Injectable, inject } from "@angular/core";
import { io } from "socket.io-client";
import { WS_BASE_URL } from "../../core/constants/api.constants";
import { AuthService } from "../../core/services/auth.service";
import {
  MessageNotification,
  PrivateMessageNotification,
} from "@harmony/notification";
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
  dmSocket = io(WS_BASE_URL + "/private-message", {
    auth: {
      token: this.authService.$token(),
    },
  });

  constructor() {
    this.messageSocket.on("disconnect", () => {
      this.messageSocket.connect();
      this.messageSocket.emit("RECONNECT", "RECONNECT");
    });
    this.dmSocket.on("disconnect", () => {
      this.dmSocket.connect();
      this.dmSocket.emit("RECONNECT", "RECONNECT");
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
    this.messageSocket.emit(MessageNotification.JOIN_CHANNEL, { channelId });
    this.serverService.getChannelMessages(channelId);
  }

  joinDM(receiverId: string) {
    this.dmSocket.emit(PrivateMessageNotification.JOIN_RECEIVER, receiverId);
  }
}
