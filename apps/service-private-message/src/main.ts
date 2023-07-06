import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { PrivateMessageModule } from "./private-message/private-message.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    PrivateMessageModule,
    getService(Services.PRIVATE_MESSAGE)
  );
  await app.listen();
}

bootstrap();
