import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, VERSION_NEUTRAL, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import helmet from "helmet";
import { RpcExceptionFilter } from "./core/filters/rpc-exception.filter";
import { patchNestJsSwagger } from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  patchNestJsSwagger();

  const port = process.env.PORT || 3000;

  if (process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("Harmony API")
      .setDescription("Harmony API")
      .setVersion("1")
      .addBearerAuth()
      .addSecurity("bearer", {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      })
      .addSecurityRequirements("bearer")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  app.use(helmet());
  app.enableCors({ origin: [process.env?.CORS_ORIGIN || "*"] });
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, "1"],
    type: VersioningType.HEADER,
    header: "Accept-Version",
  });
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
