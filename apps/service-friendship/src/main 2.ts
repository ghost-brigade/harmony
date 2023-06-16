import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
//import { RoleModule } from "./role/role.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    //RoleModule,
    getService(Services.FRIENDSHIP)
  );
  await app.listen();
}

bootstrap();
