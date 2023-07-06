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
import { ServerType, UserType } from "@harmony/zod";
import { BADGE_ANIMATION } from "./badge.animation";
import { AvatarComponent } from "../../shared/components/application/avatar/avatar.component";
import { PostEndpoint } from "../../core/constants/endpoints/post.constants";
import { DeleteEndpoint } from "../../core/constants/endpoints/delete.constants";
import { ServerIconComponent } from "../../shared/components/application/server-icon/server-icon.component";
import { I18nPipe } from "../../core/pipes/i18n.pipe";

@Component({
  selector: "harmony-application",
  standalone: true,
  imports: [
    CommonModule,
    BottomNavComponent,
    RouterModule,
    NgAutoAnimateDirective,
    AvatarComponent,
    ServerIconComponent,
    RouterModule,
    I18nPipe,
  ],
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.css"],
  animations: BADGE_ANIMATION,
})
export class ApplicationComponent implements OnInit {
  requestService = inject(RequestService);
  $selectedTab = signal("servers");
  $loading = signal(false);
  $friendRequests: WritableSignal<UserType[]> = signal([]);
  $friends: WritableSignal<UserType[]> = signal([]);
  $blockedUsers: WritableSignal<UserType[]> = signal([]);
  $servers: WritableSignal<ServerType[]> = signal([]);
  ngOnInit(): void {
    this.getServers();
    this.getFriendRequests();
    this.getFriends();
    this.getBlockedUsers();
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
          this.$friendRequests.set(friendRequests);
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
          this.$friends.set(friends);
        },
      });
  }

  getBlockedUsers() {
    this.requestService
      .get({
        endpoint: GetEndpoint.BlockedUsers,
      })
      .subscribe({
        next: (blockedUsers) => {
          console.log(blockedUsers);
          this.$blockedUsers.set(blockedUsers);
        },
      });
  }

  selectTab(tab: "servers" | "friends") {
    this.$selectedTab.set(tab);
  }

  acceptFriendRequest(friendId: string) {
    this.requestService
      .post({
        endpoint: PostEndpoint.AcceptFriendRequest,
        params: {
          friendId,
        },
        body: undefined,
      })
      .subscribe({
        next: () => {
          this.getFriendRequests();
          this.getFriends();
        },
      });
  }

  declineFriendRequest(friendId: string) {
    this.requestService
      .post({
        endpoint: PostEndpoint.DeclineFriendRequest,
        params: {
          friendId,
        },
        body: undefined,
      })
      .subscribe({
        next: () => {
          this.getFriendRequests();
        },
      });
  }

  unfriendUser(id: string) {
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.DeleteFriend,
        params: {
          id,
        },
      })
      .subscribe({
        next: () => {
          this.getFriends();
        },
      });
  }

  blockUser(id: string) {
    this.requestService
      .post({
        endpoint: PostEndpoint.BlockUser,
        params: {
          id,
        },
        body: undefined,
      })
      .subscribe({
        next: () => {
          this.getFriends();
          this.getBlockedUsers();
        },
      });
  }

  unblockUser(id: string) {
    this.requestService
      .post({
        endpoint: PostEndpoint.UnblockUser,
        params: {
          id,
        },
        body: undefined,
      })
      .subscribe({
        next: () => {
          this.getBlockedUsers();
          this.getFriends();
        },
      });
  }
}
