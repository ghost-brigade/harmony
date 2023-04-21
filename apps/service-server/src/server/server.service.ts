import { Injectable } from "@nestjs/common";
import { createServerType } from "@harmony/zod";

@Injectable()
export class ServerService {
  create(createServerType: createServerType) {
    if (!createServerType.name) {
      throw new Error("name is required");
    }
    return "This action adds a new server";
  }
}
