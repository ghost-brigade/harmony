import { Component, Input, OnDestroy, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerPopService } from "./server-pop.service";
import { FormsModule } from "@angular/forms";
import { MESSAGE_POP_ANIMATION } from "./server-pop.animation";
import { ServerGetType } from "@harmony/zod";
import { Dialog } from "@capacitor/dialog";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { DeleteEndpoint } from "apps/client/src/app/core/constants/endpoints/delete.constants";
import { Router } from "@angular/router";
import { AuthService } from "apps/client/src/app/core/services/auth.service";
import { ServerIconComponent } from "../server-icon/server-icon.component";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { API_BASE_URL } from "apps/client/src/app/core/constants/api.constants";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { finalize } from "rxjs";
import { PutEndpoint } from "apps/client/src/app/core/constants/endpoints/put.constants";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";

@Component({
  selector: "harmony-server-pop",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ServerIconComponent,
    NgAutoAnimateDirective,
    I18nPipe,
  ],
  templateUrl: "./server-pop.component.html",
  styleUrls: ["./server-pop.component.css"],
  animations: MESSAGE_POP_ANIMATION,
})
export class ServerPopComponent implements OnDestroy {
  @Input() server: ServerGetType | null = null;
  http = inject(HttpClient);
  toastService = inject(ToastService);
  alertService = inject(AlertService);
  serverPopService = inject(ServerPopService);
  authService = inject(AuthService);
  requestService = inject(RequestService);
  router = inject(Router);
  $open = computed(() => this.serverPopService.$isOpen());
  $isOwner = computed(
    () => this.server?.owner.id === this.authService.$userId()
  );
  editedServerName = "";
  editedServerPrivate = false;
  isUploading = false;

  close() {
    this.serverPopService.close();
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.editedServerPrivate = target?.checked ?? false;
  }

  async leaveServer() {
    const d = await Dialog.confirm({
      title: "Leave Server",
      message: "Are you sure you want to leave this server?",
      okButtonTitle: "Leave",
      cancelButtonTitle: "Cancel",
    });
    if (!d.value) return;
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.LeaveServer,
        params: { id: this.server?.id as string },
      })
      .subscribe({
        next: () => {
          this.serverPopService.close();
          this.router.navigate(["/app"]);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }

  copyId() {
    navigator.clipboard.writeText(this.server?.id as string);
    this.toastService.show({
      message: "COPIED_TO_CLIPBOARD",
      type: "success",
    });
  }

  async selectIcon() {
    try {
      const file = (
        await FilePicker.pickImages({
          multiple: false,
        })
      ).files[0];

      const formData = new FormData();
      formData.append("file", file.blob as Blob);

      this.isUploading = true;

      this.http
        .post(API_BASE_URL + "/server/" + this.server?.id + "/icon", formData, {
          headers: {
            Authorization: `Bearer ${this.authService.$token()}`,
          },
        })
        .pipe(finalize(() => (this.isUploading = false)))
        .subscribe({
          next: () => {
            this.toastService.show({
              message: "SERVER_UPDATE_SUCCESS",
              type: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: (err) => {
            this.alertService.show({
              message: err.error.message,
              type: "error",
            });
          },
        });

    } catch {}
  }

  updateServer() {
    this.requestService
      .put({
        endpoint: PutEndpoint.UpdateServer,
        params: {
          id: this.server?.id as string,
        },
        body: {
          name: this.editedServerName,
          private: this.editedServerPrivate,
        },
      })
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "SERVER_UPDATE_SUCCESS",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }

  async deleteServer() {
    const d = await Dialog.confirm({
      title: "Delete Server",
      message: "Are you sure you want to delete this server?",
      okButtonTitle: "Delete",
      cancelButtonTitle: "Cancel",
    });
    if (!d.value) return;
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.DeleteServer,
        params: { id: this.server?.id as string },
      })
      .subscribe({
        next: () => {
          this.serverPopService.close();
          this.router.navigate(["/app"]);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }

  ngOnDestroy() {
    this.serverPopService.close();
  }
}
