import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { NewServerService } from "./new-server/new-server.service";
import { NewServerComponent } from "./new-server/new-server.component";
import { JoinServerService } from "./join-server/join-server.service";
import { JoinServerComponent } from "./join-server/join-server.component";
import { AddFriendComponent } from "./add-friend/add-friend.component";
import { AddFriendService } from "./add-friend/add-friend.service";
import { I18nPipe } from "../../../core/pipes/i18n.pipe";

@Component({
  selector: "harmony-new",
  standalone: true,
  imports: [
    CommonModule,
    NgAutoAnimateDirective,
    NewServerComponent,
    JoinServerComponent,
    AddFriendComponent,
    I18nPipe,
  ],
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
})
export class NewComponent {
  newServerService = inject(NewServerService);
  joinServerService = inject(JoinServerService);
  addFriendService = inject(AddFriendService);

  openNewServer() {
    this.newServerService.open();
  }

  openJoinServer() {
    this.joinServerService.open();
  }

  openAddFriend() {
    this.addFriendService.open();
  }
}
