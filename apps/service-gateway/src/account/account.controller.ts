import {ApiNotFoundResponse, ApiOkResponse, ApiOperation,} from "@nestjs/swagger";
import {AccountService} from "./account.service";
import {Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, UseGuards} from "@nestjs/common";
import {User} from "@harmony/nest-schemas";
import {createUserType, publicUserSchema, publicUserType, userSchema, userType} from "@harmony/zod";
import { map } from 'rxjs/operators';

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({
    description: "Users found",
    type: [User],
  })
  @ApiNotFoundResponse({ description: "Users not found" })
  @Get()
  async findAll() {
    try {
      const users = await this.accountService.findAll();
      return users.pipe(map((users) => users.map((user) => userSchema.parse(user) as userType)));
    } catch (error) {
      throw new NotFoundException('Users not found');
    }
  }

  @ApiOperation({ summary: "Get a user by id" })
  @ApiOkResponse({
    description: "User found",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    try {
      const user = await this.accountService.findOne(id);
      return publicUserSchema.parse(user) as publicUserType;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: "Create a user" })
  @ApiOkResponse({
    description: "User created",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @Post()
  async create(@Body() createUser: createUserType) {
    try {
      console.log(createUser);
      const user = await this.accountService.create(createUser);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while creating the user');
    }
  }

}
