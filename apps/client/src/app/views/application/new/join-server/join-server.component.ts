import { Component, OnDestroy, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { JoinServerService } from "./join-server.service";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { FormsModule } from "@angular/forms";
import { JOIN_SERVER_ANIMATION } from "./join-server.animation";
import { PostEndpoint } from "apps/client/src/app/core/constants/endpoints/post.constants";
import { finalize } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "harmony-join-server",
  standalone: true,
  imports: [
    CommonModule,
    SettingsNavbarComponent,
    NgAutoAnimateDirective,
    FormsModule,
  ],
  templateUrl: "./join-server.component.html",
  styleUrls: ["./join-server.component.css"],
  animations: JOIN_SERVER_ANIMATION,
})
export class JoinServerComponent implements OnDestroy {
  $serverId = signal("");
  requestService = inject(RequestService);
  joinServerService = inject(JoinServerService);
  alertService = inject(AlertService);
  toastService = inject(ToastService);
  router = inject(Router);
  $open = computed(() => this.joinServerService.$open());
  $loading = signal(false);

  ngOnDestroy() {
    this.joinServerService.close();
  }

  close() {
    this.joinServerService.close();
  }

  createServer() {
    if (this.$serverId().length === 0) return;
    this.$loading.set(true);
    this.requestService
      .post({
        endpoint: PostEndpoint.JoinServer,
        params: {
          serverId: this.$serverId(),
        },
        body: undefined,
      })
      .pipe(finalize(() => this.$loading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "SERVER_JOIN_SUCCESS",
            type: "success",
          });
          this.router.navigate(["/app"]);
          this.joinServerService.close();
        },
        error: (err) => {
          this.alertService.show({ message: err.message, type: "error" });
        },
      });
  }
}
