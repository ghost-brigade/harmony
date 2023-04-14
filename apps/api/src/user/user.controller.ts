import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Delete,
  Param,
  UseGuards,
  HttpStatus,
  Res,
  HttpException,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { UserService } from "./user.service";
import { ZodGuard } from "../core/guards/zod/zod.guard";
import {
  createUserSchema,
  createUserType,
  publicUserSchema,
  publicUserType,
  updateUserSchema,
  updateUserType,
} from "@harmony/zod";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "../schemas";
@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Create a new user" })
  @ApiCreatedResponse({
    description: "User created successfully",
    type: User,
  })
  @ApiBadRequestResponse({
    description: "Invalid request body",
  })
  @Throttle(3, 60)
  @UseGuards(new ZodGuard("body", createUserSchema))
  @Post()
  async create(@Body() createUser: createUserType, @Res() res) {
    try {
      if (await this.userService.emailAlreadyExist(createUser.email)) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Email already exists" });
      }

      if (await this.userService.usernameAlreadyExist(createUser.username)) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Username already exists" });
      }

      const userCreated = await this.userService.create(createUser);
      return res.status(HttpStatus.CREATED).json(userCreated);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: "Update a user" })
  @ApiOkResponse({
    description: "User updated successfully",
    type: User,
  })
  @ApiBadRequestResponse({
    description: "Invalid request body",
  })
  @Patch()
  @Throttle(20, 60)
  @UseGuards(new ZodGuard("body", updateUserSchema))
  async update(@Body() UpdateUser: updateUserType) {
    try {
      const updatedUser = await this.userService.update(UpdateUser);
      return publicUserSchema.parse(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({
    description: "Users found",
    type: [User],
  })
  @ApiNotFoundResponse({
    description: "No users found",
  })
  @Get()
  async findAll(): Promise<publicUserType[]> {
    try {
      const users = await this.userService.findAll();
      if (!users)
        throw new HttpException("No users found", HttpStatus.NOT_FOUND);
      return users.map((user) =>
        publicUserSchema.parse(user)
      ) as publicUserType[];
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: "Get a user by id" })
  @ApiOkResponse({
    description: "User found",
    type: User,
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<publicUserType> {
    try {
      const user = await this.userService.findOne(id);
      return publicUserSchema.parse(user) as publicUserType;
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: "Delete a user by id" })
  @ApiNoContentResponse({
    description: "User deleted successfully",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: any) {
    try {
      const deletedUser = await this.userService.delete(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      console.log(error);
    }
  }
}
