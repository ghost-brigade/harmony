import { Component, Input, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerGetType } from "@harmony/zod";

@Component({
  selector: "harmony-user-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent {
  @Input() $server!: WritableSignal<ServerGetType | null>;
}
