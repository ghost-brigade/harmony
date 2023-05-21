import { UserContextType } from "@harmony/zod";
import { Inject, Injectable, Optional, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, firstValueFrom } from "rxjs";

@Injectable({ scope: Scope.REQUEST })
export class ServiceRequest {
  constructor(
    @Optional()
    @Inject(REQUEST)
    private request: Request & { user: Observable<UserContextType> }
  ) {}

  private async getUser(): Promise<UserContextType> {
    return await firstValueFrom(this.request.user);
  }

  public async send(client: ClientProxy, pattern: string, data: any) {
    if (data._user) {
      throw new Error("_user is a reserved key");
    }

    return client.send(pattern, {
      ...data,
      _user: (await this.getUser()) || undefined,
    });
  }
}
