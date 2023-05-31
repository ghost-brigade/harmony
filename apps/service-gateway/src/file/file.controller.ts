import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FILE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("file")
@ApiTags("File")
export class FileController {
  constructor(
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Get all files" })
  @ApiResponse({ status: 200, description: "Return all files" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get()
  async findAll() {
    return this.client.send(FILE_MESSAGE_PATTERN.FIND_ALL, {});
  }

  @ApiOperation({ summary: "Get file by id" })
  @ApiResponse({ status: 200, description: "Return file by id" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.client.send(FILE_MESSAGE_PATTERN.FIND_BY_ID, { id });
  }

  @ApiOperation({ summary: "Create file" })
  @ApiResponse({ status: 200, description: "Return created file" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Post()
  async create(@Body() payload: Buffer) {
    return this.client.send(FILE_MESSAGE_PATTERN.CREATE, payload);
  }

  @ApiOperation({ summary: "Delete file" })
  @ApiResponse({ status: 204, description: "Return deleted file" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.client.send(FILE_MESSAGE_PATTERN.DELETE, { id });
  }
}
