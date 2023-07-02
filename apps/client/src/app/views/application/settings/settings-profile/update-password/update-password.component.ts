import {
  Component,
  Input,
  OnDestroy,
  computed,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpdatePasswordService } from "./update-password.service";
import { UPDATE_PASSWORD_ANIMATION } from "./update-password.animation";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { FormsModule } from "@angular/forms";
import { PutEndpoint } from "apps/client/src/app/core/constants/endpoints/put.constants";
import { finalize } from "rxjs";
import { AlertService } from "apps/client/src/app/core/components/alert/alert.service";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { UserType } from "@harmony/zod";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";

@Component({
  selector: "harmony-update-password",
  standalone: true,
  imports: [CommonModule, FormsModule, NgAutoAnimateDirective],
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.css"],
  animations: UPDATE_PASSWORD_ANIMATION,
})
export class UpdatePasswordComponent implements OnDestroy {
  @Input() profile: UserType | null = null;
  requestService = inject(RequestService);
  updatePasswordService = inject(UpdatePasswordService);
  alertService = inject(AlertService);
  toastService = inject(ToastService);
  $open = computed(() => this.updatePasswordService.$open());
  $password = signal("");
  $confirmPassword = signal("");
  $loading = signal(false);
  $passwordMatch = computed(() => {
    if (this.$confirmPassword() && this.$password()) {
      return this.$password() === this.$confirmPassword();
    }
    return true;
  });
  btnDisabled = computed(() => {
    return (
      !this.$password() || !this.$confirmPassword() || !this.$passwordMatch()
    );
  });

  ngOnDestroy() {
    this.updatePasswordService.close();
  }

  close() {
    this.updatePasswordService.close();
  }

  updatePassword() {
    this.$loading.set(true);
    this.requestService
      .put({
        endpoint: PutEndpoint.UpdateUser,
        body: {
          password: this.$password(),
        },
        params: {
          id: this.profile?.id as string,
        },
      })
      .pipe(finalize(() => this.$loading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show({
            message: "PASSWORD_UPDATE_SUCCESS",
            type: "success",
          });
          this.close();
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
