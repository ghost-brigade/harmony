import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { TypesenseService } from "./typesense.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService, TypesenseService],
})
export class SearchModule {}
