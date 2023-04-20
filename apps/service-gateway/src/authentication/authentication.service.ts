import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";
import { loginType, userType } from "@harmony/zod";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceProperty(Services.AUTHENTICATION, "name"))
    private readonly client: ClientProxy
  ) {}

  login(loginType: loginType): Observable<userType> {
    return this.client
      .send("login", loginType)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
