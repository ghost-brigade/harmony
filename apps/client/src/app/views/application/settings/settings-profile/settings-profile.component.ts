import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsNavbarComponent } from "apps/client/src/app/shared/components/application/settings/settings-navbar/settings-navbar.component";
import { LoaderService } from "apps/client/src/app/core/components/loader/loader.service";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { GetEndpoint } from "apps/client/src/app/core/constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { UserType } from "@harmony/zod";
import { AvatarComponent } from "apps/client/src/app/shared/components/application/avatar/avatar.component";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { FormsModule } from "@angular/forms";
import { UpdatePasswordComponent } from "./update-password/update-password.component";
import { UpdatePasswordService } from "./update-password/update-password.service";
import { HttpClient } from "@angular/common/http";
import { PutEndpoint } from "apps/client/src/app/core/constants/endpoints/put.constants";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { API_BASE_URL } from "apps/client/src/app/core/constants/api.constants";
import { AuthService } from "apps/client/src/app/core/services/auth.service";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { I18nPipe } from "../../../../core/pipes/i18n.pipe";

@Component({
  selector: "harmony-settings-profile",
  standalone: true,
  imports: [
    CommonModule,
    SettingsNavbarComponent,
    AvatarComponent,
    FormsModule,
    UpdatePasswordComponent,
    NgAutoAnimateDirective,
    I18nPipe,
  ],
  templateUrl: "./settings-profile.component.html",
  styleUrls: ["./settings-profile.component.css"],
})
export class SettingsProfileComponent implements OnInit, OnDestroy {
  loaderService = inject(LoaderService);
  authService = inject(AuthService);
  requestService = inject(RequestService);
  toastService = inject(ToastService);
  alertService = inject(AlertService);
  http = inject(HttpClient);
  updatePasswordService = inject(UpdatePasswordService);
  profile: UserType | null = null;
  isUploading = false;

  ngOnInit() {
    this.getProfile();
  }

  ngOnDestroy() {
    this.loaderService.hide();
    this.alertService.dismiss();
  }

  getProfile() {
    const t = window.setTimeout(() => {
      this.loaderService.show();
    }, 1000);
    this.requestService
      .get({
        endpoint: GetEndpoint.Profile,
      })
      .pipe(
        finalize(() => {
          this.loaderService.hide();
          window.clearTimeout(t);
        })
      )
      .subscribe({
        next: (response) => {
          this.loaderService.hide();
          this.profile = response;
        },
      });
  }

  async selectAvatar() {
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
        .post(API_BASE_URL + "/user/avatar", formData, {
          headers: {
            Authorization: `Bearer ${this.authService.$token()}`,
          },
        })
        .pipe(finalize(() => (this.isUploading = false)))
        .subscribe({
          next: () => {
            this.toastService.show({
              message: "PROFILE_UPDATE_SUCCESS",
              type: "success",
            });
            this.getProfile();
          },
          error: (err) => {
            this.alertService.show({
              message: err.error.message,
              type: "error",
            });
          },
        });

      console.log(file);
    } catch {}
  }

  openPasswordUpdate() {
    this.updatePasswordService.open();
  }

  updateUser() {
    this.requestService
      .put({
        endpoint: PutEndpoint.UpdateUser,
        body: {
          email: this.profile?.email,
          username: this.profile?.username,
        },
        params: {
          id: this.profile?.id as string,
        },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "PROFILE_UPDATE_SUCCESS",
            type: "success",
          });
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
