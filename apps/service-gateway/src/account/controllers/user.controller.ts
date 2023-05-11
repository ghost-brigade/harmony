import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { UserService } from "../user.service";
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { User } from "@harmony/nest-schemas";
import {
  createUserType,
  publicUserDto,
  publicUserSchema,
  publicUserType,
  userParamsType,
} from "@harmony/zod";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({
    description: "User",
    type: publicUserDto,
  })
  @ApiNotFoundResponse({ description: "Users not found" })
  @ApiUnprocessableEntityResponse({ description: "Invalid parameters" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get()
  findAll(@Query() params?: userParamsType | undefined) {
    return this.userService.findAll(params);
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
      const user = await this.userService.findOne(id);
      return publicUserSchema.parse(user) as publicUserType;
    } catch (error) {
      throw new NotFoundException("User not found");
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
      const user = await this.userService.create(createUser);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "An error occurred while creating the user"
      );
    }
  }
}
