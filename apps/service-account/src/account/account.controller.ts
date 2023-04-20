import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AccountService } from "./account.service";
import { publicUserSchema, publicUserType, userType } from "@harmony/zod";

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern("account_find_all")
  async findAll() {
    try {
      return await this.accountService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern("account_find_one")
  async findOne(data) {
    try {
      const user = await this.accountService.findOneBy(data);

      if (data.private === false) {
        return publicUserSchema.parse(user) as userType;
      }

       return user;
     } catch (error) {
       console.log(error);
    }
  }



}
