import { AfterViewInit, Component, OnDestroy, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { SocketService } from "../../../../services/socket.service";
import { CALL_ANIMATION } from "./call.animation";
import { NgAutoAnimateDirective } from "ng-auto-animate";

@Component({
  selector: "harmony-call",
  standalone: true,
  imports: [CommonModule, NgAutoAnimateDirective],
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
  animations: CALL_ANIMATION,
})
export class CallComponent implements AfterViewInit, OnDestroy {
  serverService = inject(ServerService);
  socketService = inject(SocketService);
  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: "turn:167.235.15.244:3478",
        username: "username",
        credential: "password",
      },
    ],
  };
  peerConnection: RTCPeerConnection = new RTCPeerConnection(this.configuration);
  stream: MediaStream | undefined;
  remoteStreams: {
    [key: string]: MediaStream;
  } = {};

  ngAfterViewInit() {
    this.setupPeerConnection();
  }

  ngOnDestroy() {
    this.peerConnection.close();
  }

  private setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.configuration);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
      (stream) => {
        this.stream = stream;
        const videoElement = document.getElementById("localVideo");
        if (videoElement instanceof HTMLVideoElement) {
          videoElement.srcObject = stream;
        }
        stream.getTracks().forEach((track) => {
          this.peerConnection.addTrack(track, stream);
        });
      },
      (error) => {
        console.error("getUserMedia", error);
      }
    );
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socketService.messageSocket.emit("voice_offer", {
          channelId: this.serverService.$voiceChannel(),
          answer: event.candidate,
        });
      }
    };

    this.peerConnection.ontrack = (event) => {
      console.log("ontrack", event);
      if (!this.remoteStreams[event.streams[0].id]) {
        this.remoteStreams[event.streams[0].id] = new MediaStream();
      }
      if (this.remoteStreams[event.streams[0].id]) {
        //if (event.track.kind === "audio") {
        //  this.remoteStreams[event.streams[0].id].addTrack(event.track);
        //}
        if (event.track.kind === "video") {
          //this.remoteStreams[event.streams[0].id].addTrack(event.track);
          this.remoteStreams[event.streams[0].id] = event.streams[0];
        }
      }
      console.log(this.remoteStreams);
    };

    this.peerConnection.onnegotiationneeded = async () => {
      console.log("onnegotiationneeded");
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.socketService.messageSocket.emit("join_channel", {
        channelId: this.serverService.$voiceChannel(),
        offer,
      });
    };

    this.socketService.messageSocket.on(
      "voice_answer",
      async (answer: { answer: RTCSessionDescription }) => {
        console.log("voice_answer", answer);
        await this.peerConnection.setRemoteDescription(answer.answer);
      }
    );

    this.socketService.messageSocket.on(
      "voice_join",
      async (offer: { offer: RTCSessionDescription }) => {
        console.log("voice_join", offer);
        await this.peerConnection.setRemoteDescription(offer.offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.socketService.messageSocket.emit("voice_answer", {
          channelId: this.serverService.$voiceChannel(),
          answer,
        });
      }
    );
  }

  endCall() {
    this.socketService.joinChannel(this.serverService.$activeChannel());
    this.serverService.setActiveChannel(this.serverService.$activeChannel());
    this.serverService.getChannelMessages(this.serverService.$activeChannel());
    this.serverService.$isChannelListOpen.set(false);
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        this.peerConnection.removeTrack(
          this.peerConnection
            .getSenders()
            .find((sender) => sender.track === track) as RTCRtpSender
        );
        track.stop();
      });
    }
    this.peerConnection.close();
    this.serverService.closeCall();
  }
  changeVideo() {
    console.log("changeVideo");
  }
}
