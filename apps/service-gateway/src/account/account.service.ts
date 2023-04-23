import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";
import {createUserType, publicUserType, userType} from "@harmony/zod";
import { Observable } from "rxjs";

@Injectable()
export class AccountService {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, 'name')) private readonly client: ClientProxy
  ) {}

  async findAll(): Promise<Observable<userType[]>> {
    return await this.client.send("account_find_all", {});
  }

  async findOne(id: string): Promise<Observable<publicUserType>> {
    return await this.client.send("account_find_one", { id });
  }

  create(user: createUserType): Observable<userType> {
    return this.client.send("account_create", user);
  }

}
