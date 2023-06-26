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
  @ApiOkResponse({ description: "User updated", type: User })
  @ApiNotFoundResponse({ description: "User not found" })
  @Put(":id")
  public update(
    @Param("id") id: string,
    @Body() updateUser: UserUpdateType,
  ) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: ACCOUNT_MESSAGE_PATTERN.UPDATE,
      data: { id, updateUser },
    });
  }
}
