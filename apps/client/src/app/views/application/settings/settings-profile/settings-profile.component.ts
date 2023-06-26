import { Component, OnInit, inject } from "@angular/core";
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

@Component({
  selector: "harmony-settings-profile",
  standalone: true,
  imports: [
    CommonModule,
    SettingsNavbarComponent,
    AvatarComponent,
    FormsModule,
    UpdatePasswordComponent,
  ],
  templateUrl: "./settings-profile.component.html",
  styleUrls: ["./settings-profile.component.css"],
})
export class SettingsProfileComponent implements OnInit {
  loaderService = inject(LoaderService);
  requestService = inject(RequestService);
  alertService = inject(AlertService);
  http = inject(HttpClient);
  updatePasswordService = inject(UpdatePasswordService);
  profile: UserType | null = null;

  ngOnInit() {
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
          console.log(response);
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
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: () => {
          this.alertService.show({
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
