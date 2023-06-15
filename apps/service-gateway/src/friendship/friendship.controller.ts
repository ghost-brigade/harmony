import { ServiceRequest } from "@harmony/nest-microservice";
import {
  FRIENDSHIP_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { FileCreateDto, FileDto } from "@harmony/zod";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Controller("file")
@ApiTags("File")
export class FileController {
  constructor(
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  @ApiOperation({ summary: "Get all files" })
  @ApiOkResponse({ status: 200, description: "Return all files" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get()
  async findAll() {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FILE_MESSAGE_PATTERN.FIND_ALL,
    });
  }

  @ApiOperation({ summary: "Get file by id" })
  @ApiOkResponse({
    status: 200,
    description: "Return file by id",
    type: FileCreateDto,
  })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
      data: { id },
    });
  }

  @ApiOperation({ summary: "Create file" })
  @ApiCreatedResponse({
    status: 201,
    description: "Return created file",
    type: FileDto,
  })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @UseInterceptors(FileInterceptor("file"))
  @Post()
  async create(@UploadedFile() file: Express.Multer.File, @Body() FileCreateDto: FileCreateDto) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FILE_MESSAGE_PATTERN.CREATE,
      data: {
        ...FileCreateDto,
        file,
      },
    });
  }

  @ApiOperation({ summary: "Delete file" })
  @ApiNoContentResponse({ status: 204, description: "Return deleted file" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @HttpCode(204)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: FILE_MESSAGE_PATTERN.DELETE,
      data: { id },
    });
  }
}
