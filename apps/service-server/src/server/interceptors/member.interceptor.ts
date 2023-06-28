import { ServiceRequest } from "@harmony/nest-microservice";
import { Server } from "@harmony/nest-schemas";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ServerType } from "@harmony/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { from } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class MemberInterceptor implements NestInterceptor {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(switchMap((value) => from(this.member(value))));
  }

  private async member(server: ServerType) {
    if (!server.members) return server;

    const users = await this.memberServer(server);

    console.log(server);

    // @ts-ignore
    if (server.toJSON()) {
      // @ts-ignore
      const data = server.toJSON();
      return {
        ...data,
        members: users,
      };
    }

    return {
      ...server,
      members: users,
    };
  }

  private async memberServer(server: ServerType) {
    const users = await this.serviceRequest.send({
      client: this.accountService,
      pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS,
      data: {
        ids: server.members,
      },
      promise: true,
    });
    return users;
  }
}
