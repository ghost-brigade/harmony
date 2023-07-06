import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FriendType,
  RoleType,
  ServerType,
  UserContextType,
  UserPublicType,
  UserType,
} from "@harmony/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { FriendService } from "../friend/friend.service";

@Injectable()
export class FindFriend implements NestInterceptor {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    private readonly serviceRequest: ServiceRequest,
    private readonly friendService: FriendService
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(switchMap((value) => from(this.global(value))));
  }

  private async global(findFriend) {
    if (findFriend.friend.user1 !== findFriend.user.id) {
      return this.friendUser1Return(findFriend.friend);
    } else {
      return this.friendUser2Return(findFriend.friend);
    }
  }
  private async friendUser1Return(findFriend) {
    try {
      const user = await this.serviceRequest.send({
        client: this.accountService,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
        data: { id: findFriend.friend.user1 },
        promise: true,
      });
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }
  private async friendUser2Return(friend) {
    try {
      const user = await this.serviceRequest.send({
        client: this.accountService,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
        data: { id: friend.user2 },
        promise: true,
      });
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }
}
