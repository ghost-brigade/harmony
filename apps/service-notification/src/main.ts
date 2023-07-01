import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { MessageModule } from "./notification/message.module";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  app.connectMicroservice(getService(Services.NOTIFICATION));

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
