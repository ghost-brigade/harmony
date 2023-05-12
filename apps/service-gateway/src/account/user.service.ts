import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ACCOUNT_MESSAGE_PATTERN,
  getServiceProperty,
  Services,
} from "@harmony/service-config";
import {
  UserJwtType,
  UserCreateType,
  UserPublicType,
  UserParamsType,
  UserType,
} from "@harmony/zod";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  findAll(params: UserParamsType): Observable<UserType[]> {
    return this.client
      .send("account_find_all", params)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }

  async findOne(id: string): Promise<Observable<UserType>> {
    return await this.client
      .send("account_find_one", { id })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }

  create(user: UserCreateType): Observable<UserType> {
    return this.client.send("account_create", user);
    // .pipe(
    //   catchError((error) =>
    //     throwError(() => new RpcException(error.response))
    //   )
    // );
  }

  /**
   * Get the profile of the current logged in user.
   * @returns publicUserType
   */
  profile({ user }: { user: UserJwtType }): Observable<UserPublicType> {
    return this.client
      .send(ACCOUNT_MESSAGE_PATTERN.PROFILE, { user })
      .pipe(
        catchError((error) => throwError(() => new RpcException(error.message)))
      );
  }
}
