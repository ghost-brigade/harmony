import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { AuthenticationModule } from "./authentication/authentication.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AuthenticationModule,
    getService(Services.AUTHENTICATION)
  );
  await app.listen();
}

bootstrap();
