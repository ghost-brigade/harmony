import { getService, servicesEnum } from '@harmony/service-config';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory
    .createMicroservice(AppModule, getService(servicesEnum.AUTHENTICATION));
  await app.listen();
}

bootstrap();
