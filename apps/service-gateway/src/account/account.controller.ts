import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { AccountService } from "./account.service";
import { Controller, Get, NotFoundException, Param, Response } from "@nestjs/common";
import { User } from "@harmony/nest-schemas";
import { publicUserSchema, publicUserType } from "@harmony/zod";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: "Get a user by id" })
  @ApiOkResponse({
    description: "User found",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<publicUserType> {
    try {
      const user = await this.accountService.findOne(id);
      return publicUserSchema.parse(user) as publicUserType;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
