import { Transport } from '@nestjs/microservices';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'service-authentication',
      port: 3000,
    },
  });
  await app.listen();
}

bootstrap();
