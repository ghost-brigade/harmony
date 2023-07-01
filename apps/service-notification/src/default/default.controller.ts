import { Controller, Get } from "@nestjs/common";

@Controller()
export class DefaultController {
  @Get()
  default() {
    return {
      version: "1.0.0",
      description: "Harmony ws api",
    };
  }
}
