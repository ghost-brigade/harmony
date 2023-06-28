import { AppModule } from "./app.module";
import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    getService(Services.SERVER)
  );
  await app.listen();
}

bootstrap();
