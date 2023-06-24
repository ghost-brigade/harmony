import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { SearchModule } from "./search/search.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    SearchModule,
    getService(Services.SEARCH)
  );
  await app.listen();
}

bootstrap();
