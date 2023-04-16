import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { getServiceName, servicesEnum } from "@harmony/service-config";

@Injectable()
export class AccountService {
  constructor(
    @Inject(getServiceName(servicesEnum.ACCOUNT)) private readonly client: ClientProxy
  ) {}

  async getAccount() {
    return this.client.send("account_collection_get", {});
  }
}
