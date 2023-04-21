import { ServerModule } from "./server/server.module";
import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ServerModule,
    getService(Services.SERVER)
  );
  await app.listen();
}

bootstrap();
