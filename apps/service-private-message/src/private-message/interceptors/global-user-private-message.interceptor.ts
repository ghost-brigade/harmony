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
export class GlobalUserPrivateMessageInterceptor implements NestInterceptor {
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
        switchMap((users) =>
          from(Promise.all(users.map((user) => this.global(user))))
        )
      );
  }

  private async global(user) {
    let aggregateObject = {
      
    };

    if (user) {
      aggregateObject = await this.userIdToUser(user);
    }

    // @ts-ignore
    return aggregateObject;
  }

  private async userIdToUser(userId) {
    console.log(userId);
    const user = await this.serviceRequest.send({
      client: this.accountService,
      pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
      data: {
        id: userId,
      },
      promise: true,
    });
    console.log(user);

    // if (user.avatar) {
    //   const icon = await this.serviceRequest.send({
    //     client: this.fileService,
    //     pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
    //     data: {
    //       id: user.avatar,
    //     },
    //     promise: true,
    //   });
    //   user.avatar = icon.url;
    // }
    // console.log(user);

    return user;
  }
}
