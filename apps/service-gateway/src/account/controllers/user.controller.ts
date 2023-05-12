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
  Inject,
  NotFoundException,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { User } from "@harmony/nest-schemas";
import {
  UserCreateType,
  UserPublicDto,
  UserPublicSchema,
  UserPublicType,
  UserParamsType,
} from "@harmony/zod";
import { Services, getServiceProperty } from "@harmony/service-config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Observable, catchError, throwError } from "rxjs";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({
    description: "User",
    type: UserPublicDto,
  })
  @ApiNotFoundResponse({ description: "Users not found" })
  @ApiUnprocessableEntityResponse({ description: "Invalid parameters" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get()
  findAll(@Query() params?: UserParamsType | undefined) {
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
      return UserPublicSchema.parse(user) as UserPublicType;
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
  public create(@Body() createUser: UserCreateType): Observable<User> {
    return this.client
      .send("account_create", createUser)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response))
        )
      );
  }
}
