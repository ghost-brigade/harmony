import { getService, Services } from "@harmony/service-config";
import { NestFactory } from "@nestjs/core";
import { FriendshipModule } from "./friendship/friendship.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    FriendshipModule,
    getService(Services.FRIENDSHIP)
  );
  await app.listen();
}

bootstrap();
