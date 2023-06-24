import { Controller, Get } from "@nestjs/common";

import { SearchService } from "./search.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SEARCH_MESSAGE_PATTERN } from "@harmony/service-config";
import { UserContext } from "@harmony/nest-microservice";
import { IdType, UserContextType } from "@harmony/zod";

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern(SEARCH_MESSAGE_PATTERN.CREATE)
  async create(
    @Payload() payload: { id: IdType; channelId: IdType; content: string },
    @UserContext() user: UserContextType
  ) {
    return await this.searchService.create(payload, user);
  }

  @MessagePattern(SEARCH_MESSAGE_PATTERN.UPDATE)
  async update(
    @Payload() payload: { id: IdType; content: string },
    @UserContext() user: UserContextType
  ) {
    return await this.searchService.update(payload, user);
  }

  @MessagePattern(SEARCH_MESSAGE_PATTERN.DELETE)
  async delete(
    @Payload() payload: { id: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.searchService.delete(payload, user);
  }

  @MessagePattern(SEARCH_MESSAGE_PATTERN.FIND)
  async find(
    @Payload() payload: { channelId: IdType; content?: string; id?: IdType },
    @UserContext() user: UserContextType
  ) {
    return await this.searchService.find(payload, user);
  }
}
