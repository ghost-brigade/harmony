import { SearchDto } from "@harmony/zod";
import { SEARCH_MESSAGE_PATTERN } from "@harmony/service-config";
import { Controller, Get, Inject, Query } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Services, getServiceProperty } from "@harmony/service-config";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceRequest } from "@harmony/nest-microservice";
@Controller("search")
export class SearchController {
  constructor(
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly client: ClientProxy
  ) {}

  @ApiTags("Search")
  @ApiOkResponse({
    description: "Search",
  })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get()
  find(@Query() search: SearchDto) {
    return this.serviceRequest.send({
      client: this.client,
      pattern: SEARCH_MESSAGE_PATTERN.FIND,
      data: search,
    });
  }
}
