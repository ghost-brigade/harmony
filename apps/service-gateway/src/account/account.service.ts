import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";
import {
  createUserType,
  publicUserType,
  userParamsType,
  userType,
} from "@harmony/zod";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class AccountService {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  findAll(params: userParamsType): Observable<userType[]> {
    return this.client
      .send("account_find_all", params)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }

  async findOne(id: string): Promise<Observable<publicUserType>> {
    return await this.client.send("account_find_one", { id });
  }

  create(user: createUserType): Observable<userType> {
    return this.client.send("account_create", user);
  }
}
