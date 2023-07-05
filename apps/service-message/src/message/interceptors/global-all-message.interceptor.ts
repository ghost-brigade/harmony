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
export class GlobalAllMessageInterceptor implements NestInterceptor {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly fileService: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap((response) => {
        const messages = response.messages;
        const updatedMessages = messages.map((message) => this.global(message));

        return from(Promise.all(updatedMessages)).pipe(
          map((processedMessages) => ({
            ...response,
            messages: processedMessages,
          }))
        );
      })
    );
  }

  private async global(message: MessageType) {
    const aggregateObject = {
      author: null,
    };

    if (message.author) {
      aggregateObject.author = await this.authorMessage(message);
    }

    // @ts-ignore
    return Object.assign(message.toJSON(), aggregateObject);
  }

  private async authorMessage(message: MessageType) {
    const author = await this.serviceRequest.send({
      client: this.accountService,
      pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
      data: {
        id: message.author,
      },
      promise: true,
    });
    if (author.avatar) {
      const icon = await this.serviceRequest.send({
        client: this.fileService,
        pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
        data: {
          id: author.avatar,
        },
        promise: true,
      });
      author.avatar = icon.url;
    }

    return author;
  }
}
