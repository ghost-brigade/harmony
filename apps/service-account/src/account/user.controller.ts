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
      const user = await this.userService.findOneBy(data);
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
