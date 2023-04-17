import { AccountModule } from "./account/account.module";
import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AccountModule,
    getService(Services.ACCOUNT)
  );
  await app.listen();
}

bootstrap();
