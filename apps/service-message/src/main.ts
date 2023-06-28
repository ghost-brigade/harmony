import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { MessageModule } from "./message/message.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    MessageModule,
    getService(Services.MESSAGE)
  );
  await app.listen();
}

bootstrap();
