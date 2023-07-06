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
import { AlertService } from "../../core/components/alert/alert.service";

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
  alertService = inject(AlertService);
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
          this.$servers.set(servers);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
          this.$friendRequests.set(friendRequests);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
          this.$friends.set(friends);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
          this.$blockedUsers.set(blockedUsers);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
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
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }
}
