import {ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse,} from "@nestjs/swagger";
import {FriendshipService} from "./friendship.service";
import {Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, UseGuards} from "@nestjs/common";
import {User} from "@harmony/nest-schemas";
import {createUserType, publicUserSchema, publicUserType, userParamsSchema, userParamsType, userSchema, userType} from "@harmony/zod";
import { map } from 'rxjs/operators';
import { RpcException } from "@nestjs/microservices";

@Controller("friendship")
export class FriendshipController {
  constructor(private readonly accountService: FriendshipService) {}

  @ApiOperation({ summary: "Get all friendships" })
  @ApiOkResponse({
    description: "Friendships found",
    type: [User],
  })
  @ApiNotFoundResponse({ description: "Friendships not found" })
  @ApiUnprocessableEntityResponse({ description: "Invalid parameters" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get()
  findAll(@Query() params?: userParamsType|undefined) {
    //return this.accountService.findAll(params);
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
