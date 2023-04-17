import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle("Harmony API")
    .setDescription("Harmony API")
    .setVersion("1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.use(helmet());
  app.enableCors({ origin: [process.env?.CORS_ORIGIN || "*"] });
  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.HEADER,
    header: "Accept-Version",
  });

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
