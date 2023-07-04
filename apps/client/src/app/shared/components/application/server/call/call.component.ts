import { AfterViewInit, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
declare let JitsiMeetExternalAPI: any;

@Component({
  selector: "harmony-call",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
})
export class CallComponent implements AfterViewInit {
  @Input() username = "alexislours";
  @Input() room = "64a183a927b84d68ac9bf521";
  api: any;
  options = {
    roomName: this.room,
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
    parentNode: document.querySelector("#call-container"),
    configOverwrite: { prejoinPageEnabled: false },
    userInfo: {
      displayName: this.username,
    },
  };

  ngAfterViewInit() {
    this.options.height = document.documentElement.clientHeight;
    this.options.width = document.documentElement.clientWidth;
    this.options.parentNode = document.querySelector("#call-container");
    this.api = new JitsiMeetExternalAPI("meet.jit.si", this.options);
  }
}
