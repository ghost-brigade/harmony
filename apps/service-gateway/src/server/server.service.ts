import { SERVER_MESSAGE_PATTERN } from "@harmony/service-config";
import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";
import { ServerMemberAddType, ServerType } from "@harmony/zod";
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

  async createServer(serverData: ServerType) {
    return this.client
      .send(SERVER_MESSAGE_PATTERN.CREATE, serverData)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  async getServerById(id: string) {
    return this.client
      .send(SERVER_MESSAGE_PATTERN.GET_BY_ID, id)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  async addMemberToServer(addMemberData: ServerMemberAddType) {
    return this.client
      .send(SERVER_MESSAGE_PATTERN.ADD_MEMBER, addMemberData)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
