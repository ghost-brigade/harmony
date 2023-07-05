import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  FILE_MESSAGE_PATTERN,
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  MessageType,
  RoleType,
  ServerType,
  UserPublicType,
} from "@harmony/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { from, Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Injectable()
export class GlobalPrivateMessageInterceptor implements NestInterceptor {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly fileService: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        switchMap((messages) =>
          from(Promise.all(messages.map((message) => this.global(message))))
        )
      );
  }

  private async global(message) {
    let aggregateObject = {
      author: null,
      receiver: null,
    };

    if (message.author) {
      aggregateObject.author = await this.userMessage(message.author);
    }
    if (message.receiver) {
      aggregateObject.receiver = await this.userMessage(message.receiver);
    }

    // @ts-ignore
    return Object.assign(message.toJSON(), aggregateObject);
  }

  private async userMessage(userId) {
    const user = await this.serviceRequest.send({
      client: this.accountService,
      pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
      data: {
        id: userId,
      },
      promise: true,
    });
    if (user.avatar) {
      const icon = await this.serviceRequest.send({
        client: this.fileService,
        pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
        data: {
          id: user.avatar,
        },
        promise: true,
      });
      user.avatar = icon.url;
    } else {
      user.avatar = null;
    }

    return user;
  }
}
