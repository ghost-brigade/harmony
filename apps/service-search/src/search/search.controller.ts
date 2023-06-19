import { Controller, Get } from "@nestjs/common";

import { SearchService } from "./search.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SEARCH_MESSAGE_PATTERN } from "@harmony/service-config";
import { UserContext } from "@harmony/nest-microservice";
import { IdType, UserContextType } from "@harmony/zod";

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern(SEARCH_MESSAGE_PATTERN.FIND)
  async create(
    @Payload() payload: { id: IdType; text: string },
    @UserContext() user: UserContextType
  ) {
    return this.searchService.create(payload, user);
  }

  @MessagePattern(SEARCH_MESSAGE_PATTERN.UPDATE)
  async update(
    @Payload() payload: { id: IdType; text: string },
    @UserContext() user: UserContextType
  ) {
    return this.searchService.update(payload, user);
  }

  @MessagePattern(SEARCH_MESSAGE_PATTERN.DELETE)
  async delete(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return this.searchService.delete(payload, user);
  }

  @MessagePattern(SEARCH_MESSAGE_PATTERN.FIND)
  async find(
    @Payload() payload: { text?: string; id?: IdType },
    @UserContext() user: UserContextType
  ) {
    return this.searchService.find(payload, user);
  }
}
