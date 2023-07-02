import { Component, OnDestroy, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { AddFriendService } from "./add-friend.service";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { FormsModule } from "@angular/forms";
import { ADD_FRIEND_ANIMATION } from "./add-friend.animation";
import { PostEndpoint } from "apps/client/src/app/core/constants/endpoints/post.constants";
import { finalize } from "rxjs";

@Component({
  selector: "harmony-add-friend",
  standalone: true,
  imports: [
    CommonModule,
    SettingsNavbarComponent,
    NgAutoAnimateDirective,
    FormsModule,
  ],
  templateUrl: "./add-friend.component.html",
  styleUrls: ["./add-friend.component.css"],
  animations: ADD_FRIEND_ANIMATION,
})
export class AddFriendComponent implements OnDestroy {
  $username = signal("");
  requestService = inject(RequestService);
  addFriendService = inject(AddFriendService);
  alertService = inject(AlertService);
  toastService = inject(ToastService);
  $open = computed(() => this.addFriendService.$open());
  $loading = signal(false);

  ngOnDestroy() {
    this.addFriendService.close();
  }

  close() {
    this.addFriendService.close();
  }

  createServer() {
    if (this.$username().length === 0) return;
    this.$loading.set(true);
    this.requestService
      .post({
        endpoint: PostEndpoint.AddFriend,
        body: undefined,
        params: {
          username: this.$username(),
        },
      })
      .pipe(finalize(() => this.$loading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "SERVER_CREATE_SUCCESS",
            type: "success",
          });
          this.addFriendService.close();
        },
        error: (err) => {
          this.alertService.show({ message: err.message, type: "error" });
        },
      });
  }
}
