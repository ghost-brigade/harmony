import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { UserParamsType, UserType } from "@harmony/zod";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("account_find_all")
  async findAll(params: UserParamsType) {
    return await this.userService.findAll(params);
  }

  @MessagePattern("account_find_one")
  async findOne(data: UserType) {
    try {
      let user: UserType;

      if (Object.keys(data).length === 1 && "id" in data) {
        user = await this.userService.findOne(data.id);
      } else {
        user = await this.userService.findOneBy(data);
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern("account_create")
  async create(data) {
    return await this.userService.create(data);
  }
}
