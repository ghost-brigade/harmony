import {
  ApiBody,
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
  Put,
  Query,
} from "@nestjs/common";
import { User } from "@harmony/nest-schemas";
import {
  UserCreateType,
  UserPublicDto,
  UserPublicType,
  UserParamsType,
  UserUpdateType,
  UsernameStatusDto,
  UserContextType,
  UserCreateDto,
  UserUpdateDto,
} from "@harmony/zod";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Public } from "../../core/decorators/public.decorator";
import { ServiceRequest, UserContext } from "@harmony/nest-microservice";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "find all banned users" })
  @ApiOkResponse({ description: "Users banned displayed", type: User })
  @ApiNotFoundResponse({ description: "Ban user not found" })
  @Get("/blocked")
  public findAllBannedUsers() {
    console.log("findAllBannedUser controller sdsfgateway");
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.BANNED_USERS,
    });
  }

  @ApiOperation({ summary: "Check if username is available" })
  @ApiOkResponse({
    description: "Username status",
    type: UsernameStatusDto,
  })
  @ApiUnprocessableEntityResponse({ description: "Invalid parameters" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  @Get("username/:username/status")
  isUsernameAvailable(
    @Param("username") username: string
  ): Observable<UserPublicType> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.USERNAME_AVAILABLE, {
      username,
    });
  }

  // @ApiOperation({ summary: "Get all users" })
  // @ApiOkResponse({
  //   description: "User",
  //   type: UserPublicDto,
  // })
  // @ApiNotFoundResponse({ description: "Users not found" })
  // @ApiUnprocessableEntityResponse({ description: "Invalid parameters" })
  // @ApiInternalServerErrorResponse({ description: "Internal server error" })
  // @Get()
  // findAll(
  //   @Query() params?: UserParamsType | undefined
  // ): Observable<UserPublicType[]> {
  //   return this.client.send(ACCOUNT_MESSAGE_PATTERN.FIND_ALL, params);
  // }

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
  @ApiBody({ type: UserCreateDto })
  @Public()
  @Post()
  public create(@Body() createUser: UserCreateType): Observable<User> {
    return this.client.send(ACCOUNT_MESSAGE_PATTERN.CREATE, createUser);
  }

  @ApiOperation({ summary: "Update a user" })
  @ApiOkResponse({ description: "User updated", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBody({ type: UserUpdateDto })
  @Put(":id")
  public update(@Param("id") id: string, @Body() updateUser: UserUpdateType) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.UPDATE,
      data: { id, updateUser },
    });
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiOkResponse({ description: "Banned User added", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @Post("/block/:id")
  public banUser(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.BAN_USER,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Cancel ban user" })
  @ApiOkResponse({ description: "Banned User canceled", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @Post("/unblock/:id")
  public cancelBanUser(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.CANCEL_BAN_USER,
      data: { id },
    });
  }
}
