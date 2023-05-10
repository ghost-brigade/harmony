import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { userParamsType, userType } from "@harmony/zod";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("account_find_all")
  async findAll(params: userParamsType) {
    return await this.userService.findAll(params);
  }

  @MessagePattern("account_find_one")
  async findOne(data: userType) {
    try {
<<<<<<< HEAD:apps/service-account/src/account/user.controller.ts
      const user = await this.userService.findOneBy(data);
=======
      let user: userType;

      if (Object.keys(data).length === 1 && "id" in data) {
        user = await this.accountService.findOne(data.id);
      } else {
        user = await this.accountService.findOneBy(data);
      }

>>>>>>> main:apps/service-account/src/account/account.controller.ts
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern("account_create")
  async create(data) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      console.log(error);
    }
  }
}
