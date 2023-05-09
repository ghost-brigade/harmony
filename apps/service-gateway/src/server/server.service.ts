import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";
import { serverType } from "@harmony/zod";
import { catchError, throwError } from "rxjs";

@Injectable()
export class ServerService {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly client: ClientProxy
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async createServer(serverData: serverType) {
    return this.client
      .send("server.create", serverData)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  async getServerById(id: string) {
    return this.client
      .send("server.getServerById", id)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
