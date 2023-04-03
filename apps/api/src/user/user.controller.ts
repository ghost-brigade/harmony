import { Controller, Post, Body, Patch, Get, Delete, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { User } from "../schemas";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createCatDto: CreateUserDto) {
    try {
      return await this.userService.create(createCatDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch()
  async update(@Body() UpdateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(UpdateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOne(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async delete(id: string) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

}
