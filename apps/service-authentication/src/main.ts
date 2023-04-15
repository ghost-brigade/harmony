import { Transport } from "@nestjs/microservices";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ConfigService } from "@harmony/config";

async function bootstrap() {
  const authService = new ConfigService().initialize().get().authentication_service;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: authService.transport,
    options: authService.options,
  });
  await app.listen();
}

bootstrap();
