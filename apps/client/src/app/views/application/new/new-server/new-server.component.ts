import { Component, OnDestroy, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { NewServerService } from "./new-server.service";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { FormsModule } from "@angular/forms";
import { NEW_SERVER_ANIMATION } from "./new-server.animation";
import { PostEndpoint } from "apps/client/src/app/core/constants/endpoints/post.constants";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";

@Component({
  selector: "harmony-new-server",
  standalone: true,
  imports: [
    CommonModule,
    SettingsNavbarComponent,
    NgAutoAnimateDirective,
    FormsModule,
    I18nPipe,
  ],
  templateUrl: "./new-server.component.html",
  styleUrls: ["./new-server.component.css"],
  animations: NEW_SERVER_ANIMATION,
})
export class NewServerComponent implements OnDestroy {
  $serverName = signal("");
  requestService = inject(RequestService);
  newServerService = inject(NewServerService);
  alertService = inject(AlertService);
  toastService = inject(ToastService);
  router = inject(Router);
  $isPrivate = signal(false);
  $open = computed(() => this.newServerService.$open());
  $loading = signal(false);

  ngOnDestroy() {
    this.newServerService.close();
  }

  close() {
    this.newServerService.close();
  }

  createServer() {
    if (this.$serverName().length === 0) return;
    this.$loading.set(true);
    this.requestService
      .post({
        endpoint: PostEndpoint.CreateServer,
        body: {
          name: this.$serverName(),
          private: this.$isPrivate(),
        },
      })
      .pipe(finalize(() => this.$loading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "SERVER_CREATE_SUCCESS",
            type: "success",
          });
          this.router.navigate(["/app"]);
          this.newServerService.close();
        },
        error: (err) => {
          this.alertService.show({ message: err.message, type: "error" });
        },
      });
  }
}
