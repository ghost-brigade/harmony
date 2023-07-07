import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { RequestService } from "../../../core/services/request.service";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { AlertService } from "../../../core/components/alert/alert.service";
import { UserType } from "@harmony/zod";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { AvatarComponent } from "../../../shared/components/application/avatar/avatar.component";
import { I18nPipe } from "../../../core/pipes/i18n.pipe";
import { ChatService } from "./chat/chat.service";

@Component({
  selector: "harmony-direct-messages",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgAutoAnimateDirective,
    AvatarComponent,
    I18nPipe,
  ],
  templateUrl: "./direct-messages.component.html",
  styleUrls: ["./direct-messages.component.css"],
})
export class DirectMessagesComponent implements OnInit {
  requestService = inject(RequestService);
  alertService = inject(AlertService);
  chatService = inject(ChatService);
  router = inject(Router);
  $dms: WritableSignal<UserType[]> = signal([]);

  ngOnInit(): void {
    this.requestService
      .get({
        endpoint: GetEndpoint.DirectMessages,
      })
      .subscribe({
        next: (res) => {
          this.$dms.set(res);
        },
        error: (err) => {
          this.alertService.show({
            message: err.error.message,
            type: "error",
          });
        },
      });
  }

  goToDM(dm: UserType) {
    console.log(dm);
    this.chatService.$user.set(dm);
    this.router.navigate(["/app/dms", dm.id]);
  }
}
