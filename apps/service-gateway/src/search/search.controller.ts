import {
  IdType,
  SearchCreateType,
  SearchDto,
  SearchUpdateType,
} from "@harmony/zod";
import { SEARCH_MESSAGE_PATTERN } from "@harmony/service-config";
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
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Services, getServiceProperty } from "@harmony/service-config";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceRequest } from "@harmony/nest-microservice";

@ApiTags("Search")
@Controller("search")
export class SearchController {
  constructor(
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly client: ClientProxy
  ) {}

  // TODO: Check if author is in channel before search, create
  //         not needed for deleting and updating because
  //         only author can update or delete its own message

  // @ApiCreatedResponse({
  //   description: "Search",
  // })
  // @ApiBadRequestResponse()
  // @HttpCode(201)
  // @Post()
  // create(@Body() createSearch: SearchCreateType) {
  //   return this.serviceRequest.send({
  //     client: this.client,
  //     pattern: SEARCH_MESSAGE_PATTERN.CREATE,
  //     data: createSearch,
  //   });
  // }

  @ApiOkResponse({
    description: "Search",
  })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get()
  find(@Query() query: { id?: IdType; content?: string }) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SEARCH_MESSAGE_PATTERN.FIND,
      data: { ...query },
    });
  }

  // @ApiOkResponse({
  //   description: "Update Search by message id",
  // })
  // @ApiBadRequestResponse()
  // @Put(":id")
  // update(@Param("id") id: IdType, @Body() updateSearch: SearchUpdateType) {
  //   return this.serviceRequest.send({
  //     client: this.client,
  //     pattern: SEARCH_MESSAGE_PATTERN.UPDATE,
  //     data: { id, ...updateSearch },
  //   });
  // }

  // @ApiNoContentResponse({
  //   description: "Delete Search by message id",
  // })
  // @ApiBadRequestResponse()
  // @HttpCode(204)
  // @Delete(":id")
  // delete(@Param("id") id: IdType) {
  //   return this.serviceRequest.send({
  //     client: this.client,
  //     pattern: SEARCH_MESSAGE_PATTERN.DELETE,
  //     data: { id },
  //   });
  // }
}
