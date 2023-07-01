import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
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
export class FindAllFriendRequest implements NestInterceptor {
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
    console.log("____________findAllFriendRequest_______________");
    console.log("findFriend", findFriend);
    if (findFriend) {
      return this.friendsReturn(findFriend);
    }
  }
  private async friendsReturn(findFriend) {
    const user2Array = findFriend.map((friend) => ({
      sender: friend.sender,
      receiver: friend.receiver,
    }));
    console.log("______________user2Array_______________");
    console.log("user2Array", user2Array);
    try {
      const user = await this.serviceRequest.send({
        client: this.accountService,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ALL_FRIEND_REQUEST,
        data: { user2Array },
        promise: true,
      });
      delete user.email;
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }
}
