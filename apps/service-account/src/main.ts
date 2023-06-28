import { UserModule } from "./account/user.module";
import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    UserModule,
    getService(Services.ACCOUNT)
  );
  await app.listen();
}

bootstrap();
