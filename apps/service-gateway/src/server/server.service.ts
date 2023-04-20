import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { getServiceProperty, Services } from "@harmony/service-config";
import { serverSchema } from "@harmony/zod";

@Injectable()
export class ServerService {
  constructor(
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly client: ClientProxy
  ) {}

  getHello(): string {
    return "Hello World!";
  }
}
