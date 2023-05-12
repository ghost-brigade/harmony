import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  AUTHENTICATION_MESSAGE_PATTERN,
  getServiceProperty,
  Services,
} from "@harmony/service-config";
import { LoginType, UserType } from "@harmony/zod";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceProperty(Services.AUTHENTICATION, "name"))
    private readonly client: ClientProxy
  ) {}

  login(loginType: LoginType): Observable<UserType> {
    return this.client
      .send(AUTHENTICATION_MESSAGE_PATTERN.LOGIN, loginType)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }

  jwtLogin(
    access_token: string
  ): Observable<{ email: string; iat: number; exp: number }> {
    return this.client
      .send(AUTHENTICATION_MESSAGE_PATTERN.JWT_LOGIN, access_token)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
