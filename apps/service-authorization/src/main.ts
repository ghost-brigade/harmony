import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { AuthorizationModule } from "./authorization/authorization.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AuthorizationModule,
    getService(Services.AUTHORIZATION)
  );
  await app.listen();
}

bootstrap();
