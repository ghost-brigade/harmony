import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../core/decorators/public.decorator";

@Controller()
export class DefaultController {
  @ApiTags("Default")
  @ApiOperation({ summary: "Default route" })
  @Get()
  @Public()
  default() {
    return {
      version: "1.0.0",
      description: "Harmony api",
    };
  }
}
