import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AccountController {
  @MessagePattern("account_collection_get")
  async getAccount() {
    return [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
  }
}
