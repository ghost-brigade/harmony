import { Injectable, inject, signal } from "@angular/core";
import { RequestService } from "apps/client/src/app/core/services/request.service";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";

@Injectable({
  providedIn: "root",
})
export class ServerPopService {
  requestService = inject(RequestService);
  serverService = inject(ServerService);
  $isOpen = signal(false);

  open() {
    this.$isOpen.set(true);
  }

  close() {
    this.$isOpen.set(false);
  }
}
