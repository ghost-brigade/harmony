import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";

@Injectable()
export class AccountService {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, 'name')) private readonly client: ClientProxy
  ) {}

  async getAccount() {
    return this.client.send("account_collection_get", {});
  }
}
