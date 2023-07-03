import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "../../../shared/components/application/server/user-list/user-list.component";
import { ChannelListComponent } from "../../../shared/components/application/server/channel-list/channel-list.component";
import { RequestService } from "../../../core/services/request.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { ServerGetType } from "@harmony/zod";
import { ServerNavbarComponent } from "../../../shared/components/application/server/server-navbar/server-navbar.component";

@Component({
  selector: "harmony-server",
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    ChannelListComponent,
    ServerNavbarComponent,
  ],
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  requestService = inject(RequestService);
  router = inject(Router);
  $server: WritableSignal<ServerGetType | null> = signal(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { serverId } = params;
      console.log(serverId);
      this.requestService
        .get({
          endpoint: GetEndpoint.Server,
          params: {
            serverId,
          },
        })
        .subscribe({
          next: (server) => {
            this.$server.set(server);
            console.log(server);
          },
        });
    });
  }
}
