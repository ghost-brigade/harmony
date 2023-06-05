import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { User } from "@harmony/nest-schemas";
import {
  UserCreateType,
  UserPublicDto,
  UserPublicType,
  UserParamsType,
  UserUpdateType,
} from "@harmony/zod";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Public } from "../../core/decorators/public.decorator";

@Controller("user")
@ApiTags('User')
export class UserController {
  constructor(
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
  findAll(
    @Query() params?: UserParamsType | undefined
  ): Observable<UserPublicType[]> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.FIND_ALL, params);
  }

  @ApiOperation({ summary: "Get a user by id" })
  @ApiOkResponse({
    description: "User found",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @Get(":id")
  findOne(@Param("id") id: string): Observable<UserPublicType> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, { id });
  }

  @ApiOperation({ summary: "Create a user" })
  @ApiOkResponse({
    description: "User created",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @Public()
  @Post()
  public create(@Body() createUser: UserCreateType): Observable<User> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.CREATE, createUser);
  }

  @ApiOperation({ summary: "Update a user" })
  @ApiOkResponse({
    description: "User updated",
    type: User,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @Post(":id")
  public update(@Body() updateUser: UserUpdateType): Observable<UserPublicType> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.UPDATE, updateUser);
  }
}
