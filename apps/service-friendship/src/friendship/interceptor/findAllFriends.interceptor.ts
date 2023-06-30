// import { ServiceRequest } from "@harmony/nest-microservice";
// import {
//   ACCOUNT_MESSAGE_PATTERN,
//   ROLE_MESSAGE_PATTERN,
//   Services,
//   getServiceProperty,
// } from "@harmony/service-config";
// import {
//   FriendType,
//   RoleType,
//   ServerType,
//   UserContextType,
//   UserPublicType,
// } from "@harmony/zod";
// import {
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   Injectable,
//   Inject,
// } from "@nestjs/common";
// import { ClientProxy } from "@nestjs/microservices";
// import { from } from "rxjs";
// import { switchMap } from "rxjs/operators";
// import { FriendService } from "../friend/friend.service";

// @Injectable()
// export class FindAllFriends implements NestInterceptor {
//   constructor(
//     @Inject(getServiceProperty(Services.ACCOUNT, "name"))
//     private readonly accountService: ClientProxy,
//     private readonly serviceRequest: ServiceRequest,
//     private readonly friendService: FriendService
//   ) {}

//   intercept(_context: ExecutionContext, next: CallHandler) {
//     return next.handle().pipe(switchMap((value) => from(this.global(value))));
//   }

//   private async global(friend: FriendType) {
//     const aggregateObject = {
//       user1: [],
//       user2: [],
//     };

//     // console.log(friend);

//     if (friend.user1) {
//       aggregateObject.user1 = await this.friendUser1Return(friend);
//     }
//     if (friend.user2) {
//       aggregateObject.user2 = await this.friendUser2Return(friend);
//     }
//     // console.log("___________aggregate________________");
//     // console.log(aggregateObject);
//     // @ts-ignore
//     return Object.assign(friend.toJSON(), aggregateObject);
//   }
//   private async friendUser1Return(friend: FriendType) {
//     try {
//       const user = await this.serviceRequest.send({
//         client: this.accountService,
//         pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
//         data: {
//           id: friend.user1,
//         },
//         promise: true,
//       });
//       console.log(user);
//       delete user.email;
//       return user;
//     } catch (error) {
//       console.log("Error", error);
//     }
//   }
//   private async friendUser2Return(friend: FriendType) {
//     try {
//       const user = await this.serviceRequest.send({
//         client: this.accountService,
//         pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS,
//         data: {
//           ids: friend.user2,
//         },
//         promise: true,
//       });
//     //   console.log(user);
//       delete user.email;
//       return user;
//     } catch (error) {
//       console.log("Error", error);
//     }
//   }
// }
