import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ACCOUNT_MESSAGE_PATTERN,
  AUTHENTICATION_MESSAGE_PATTERN,
  getServiceProperty,
  Services,
} from "@harmony/service-config";
import { Observable } from "rxjs";
import { LoginType } from "@harmony/zod";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceProperty(Services.AUTHENTICATION, "name"))
    private readonly client: ClientProxy
  ) {}

  getLoggedInUser(email: string): Observable<any> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
      email,
    });
  }

  login(loginType: LoginType): Observable<{ access_token: string }> {
    return this.client.send(
      AUTHENTICATION_MESSAGE_PATTERN.LOGIN,
      loginType
    );
  }

  jwtLogin(
    access_token: string
  ): Observable<{ email: string; iat: number; exp: number }> {
    return this.client.send(
      AUTHENTICATION_MESSAGE_PATTERN.JWT_LOGIN,
      access_token
    );
  }
}
