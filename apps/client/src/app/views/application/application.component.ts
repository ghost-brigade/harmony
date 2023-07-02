import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { BottomNavComponent } from "../../shared/components/application/bottom-nav/bottom-nav.component";
import { RouterModule } from "@angular/router";
import { RequestService } from "../../core/services/request.service";
import { GetEndpoint } from "../../core/constants/endpoints/get.constants";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { ServerType } from "@harmony/zod";

@Component({
  selector: "harmony-application",
  standalone: true,
  imports: [
    CommonModule,
    BottomNavComponent,
    RouterModule,
    NgAutoAnimateDirective,
  ],
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.css"],
})
export class ApplicationComponent implements OnInit {
  requestService = inject(RequestService);
  $selectedTab = signal("servers");
  $loading = signal(false);
  $servers: WritableSignal<ServerType[]> = signal([]);
  ngOnInit(): void {
    this.getServers();
    this.getFriendRequests();
    this.getFriends();
  }

  getServers() {
    this.$loading.set(true);
    this.requestService
      .get({
        endpoint: GetEndpoint.Servers,
      })
      .subscribe({
        next: (servers) => {
          console.log(servers);
          this.$servers.set(servers);
        },
      });
  }

  getFriendRequests() {
    this.requestService
      .get({
        endpoint: GetEndpoint.ReceivedFriendRequests,
      })
      .subscribe({
        next: (friendRequests) => {
          console.log(friendRequests);
        },
      });
  }

  getFriends() {
    this.requestService
      .get({
        endpoint: GetEndpoint.Friends,
      })
      .subscribe({
        next: (friends) => {
          console.log(friends);
        },
      });
  }

  selectTab(tab: "servers" | "friends") {
    this.$selectedTab.set(tab);
  }
}
