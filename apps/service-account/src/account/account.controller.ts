import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AccountService } from "./account.service";
import { userParamsType, userType } from "@harmony/zod";

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern("account_find_all")
  async findAll(params: userParamsType) {
    return await this.accountService.findAll(params);
  }

  @MessagePattern("account_find_one")
  async findOne(data: userType) {
    try {
      const user = await this.accountService.findOneBy(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern("account_create")
  async create(data) {
    try {
      return await this.accountService.create(data);
    } catch (error) {
      console.log(error);
    }
  }
}
