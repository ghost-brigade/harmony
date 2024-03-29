import { UserContextType } from "@harmony/zod";
import { Inject, Injectable, Optional, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable({ scope: Scope.REQUEST })
export class ServiceRequest {
  constructor(
    @Optional()
    @Inject(REQUEST)
    private request: Request & {
      user: Promise<UserContextType>;
      data: { _user: UserContextType };
    }
  ) {}

  public send({
    client,
    pattern,
    data = {},
    promise = false,
  }: {
    client: ClientProxy;
    pattern: string;
    data?: any;
    promise?: boolean;
  }) {
    if (data._user) {
      throw new Error("_user is a reserved key");
    }

    const request = client.send(pattern, {
      ...data,
      _user: this.request.user ?? this.request?.data?._user,
    });

    return promise ? firstValueFrom(request) : request;
  }
}
