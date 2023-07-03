import { Component, Input, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerGetType } from "@harmony/zod";

@Component({
  selector: "harmony-channel-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"],
})
export class ChannelListComponent {
  @Input() $server!: WritableSignal<ServerGetType | null>;
}
