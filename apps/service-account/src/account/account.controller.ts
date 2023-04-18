import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AccountService } from "./account.service";
import { publicUserSchema, publicUserType, userType } from "@harmony/zod";

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern("account_find_one")
  async findOne(data: { id: string; private: boolean }): Promise<userType|publicUserType> {
    try {
      const user = await this.accountService.findOne(data.id);

      if (data.private === false) {
        return publicUserSchema.parse(user) as publicUserType;
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
