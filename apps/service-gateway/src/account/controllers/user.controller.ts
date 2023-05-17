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
export class UserController {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiTags('User')
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

  @ApiTags('User')
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

  @ApiTags('User')
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
}
