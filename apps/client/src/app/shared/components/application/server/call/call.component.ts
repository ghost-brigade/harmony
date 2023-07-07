import { AfterViewInit, Component, inject } from "@angular/core";
import { KeyValuePipe, NgFor, NgIf } from "@angular/common";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { SocketService } from "../../../../services/socket.service";
import { CALL_ANIMATION } from "./call.animation";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { Peer } from "peerjs";
import { AuthService } from "apps/client/src/app/core/services/auth.service";

@Component({
  selector: "harmony-call",
  standalone: true,
  imports: [NgIf, NgFor, NgAutoAnimateDirective, KeyValuePipe],
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
  animations: CALL_ANIMATION,
})
export class CallComponent implements AfterViewInit {
  serverService = inject(ServerService);
  socketService = inject(SocketService);
  authService = inject(AuthService);
  self = new Peer(this.authService.$userId());
  peers: string[] = [];
  streams: { [key: string]: MediaStream } = {};
  selfStream: MediaStream | undefined;
  userListListener: (userList: string[]) => void;
  handleUserList(userList: string[]) {
    this.peers = userList.filter((user) => user !== this.self.id);
    this.callUsers();
  }

  voiceLeaveListener: (user: string) => void;
  handleVoiceLeave(user: string) {
    delete this.streams[user];
  }

  constructor() {
    this.userListListener = this.handleUserList.bind(this);
    this.voiceLeaveListener = this.handleVoiceLeave.bind(this);
    this.socketService.messageSocket.on("user_list", this.userListListener);
    this.self.on("call", (s) => {
      s.answer(this.selfStream);
      s.on("stream", (stream) => {
        this.streams[s.peer] = stream;
      });
      s.on("close", () => {
        this.streams[s.peer]?.getTracks().forEach((track) => track.stop());
        delete this.streams[s.peer];
        this.selfStream?.getTracks().forEach((track) => track.stop());
      });
    });
    this.socketService.messageSocket.on("voice_leave", this.voiceLeaveListener);
  }

  ngAfterViewInit() {
    this.socketService.messageSocket.emit("join_voice", {
      channelId: this.serverService.$voiceChannel(),
    });
  }

  async callUsers() {
    this.streams = {};
    this.selfStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    for (const user of this.peers) {
      const call = this.self.call(user, this.selfStream);
      call.on("stream", (stream) => {
        this.streams[user] = stream;
      });
    }
  }

  endCall() {
    this.socketService.joinChannel(this.serverService.$activeChannel());
    this.serverService.setActiveChannel(this.serverService.$activeChannel());
    this.serverService.getChannelMessages(this.serverService.$activeChannel());
    this.self.disconnect();
    this.self.destroy();
    this.self.removeAllListeners();
    this.socketService.messageSocket.off("user_list", this.userListListener);
    this.socketService.messageSocket.off(
      "voice_leave",
      this.voiceLeaveListener
    );
    this.serverService.$isChannelListOpen.set(false);
  }
}
