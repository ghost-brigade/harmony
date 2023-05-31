import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { FileModule } from "./file/file.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    FileModule,
    getService(Services.FILE)
  );
  await app.listen();
}

bootstrap();
