import { AccountModule } from "./account/account.module";
import { getService, servicesEnum } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AccountModule,
    getService(servicesEnum.ACCOUNT)
  );
  await app.listen();
}

bootstrap();
