import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { RequestService } from "../../../core/services/request.service";
import { FormsModule } from "@angular/forms";
import { GetEndpoint } from "../../../core/constants/endpoints/get.constants";
import { ServerType } from "@harmony/zod";
import { PostEndpoint } from "../../../core/constants/endpoints/post.constants";
import { Router } from "@angular/router";
import { SERVER_SEARCH_ANIMATION } from "./server-search.animation";

@Component({
  selector: "harmony-search",
  standalone: true,
  imports: [CommonModule, NgAutoAnimateDirective, FormsModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  animations: SERVER_SEARCH_ANIMATION,
})
export class SearchComponent implements OnInit {
  requestService = inject(RequestService);
  router = inject(Router);
  $name = signal("");
  servers: ServerType[] = [];
  $userServers: WritableSignal<ServerType[]> = signal([]);
  t = -1;

  ngOnInit(): void {
    this.requestService.get({ endpoint: GetEndpoint.Servers }).subscribe({
      next: (servers) => {
        console.log(servers);
        this.$userServers.set(servers);
      },
    });
    this.searchServers();
  }

  onNameInput() {
    clearTimeout(this.t);
    this.t = window.setTimeout(() => {
      this.searchServers();
    }, 500);
  }

  searchServers() {
    console.log(this.$name());
    this.requestService
      .get({
        endpoint: GetEndpoint.SearchServers,
        queryParams: {
          name: this.$name(),
        },
      })
      .subscribe({
        next: (servers) => {
          this.servers = this.servers.filter((server) => {
            return servers.some((s) => s.id === server.id);
          });
          servers.forEach((server) => {
            if (!this.servers.some((s) => s.id === server.id)) {
              this.servers.push(server);
            }
          });
        },
      });
  }

  joinServer(server: ServerType) {
    console.log(server);
    this.requestService
      .post({
        endpoint: PostEndpoint.JoinServer,
        body: undefined,
        params: {
          serverId: server.id as string,
        },
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/app/server/${server.id}`);
        },
      });
  }

  isServerJoined(server: ServerType) {
    return this.$userServers().some(
      (userServer) => userServer.id === server.id
    );
  }
}
