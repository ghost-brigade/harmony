import { NestMicroserviceModule } from "@harmony/nest-microservice";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleSchema } from "@harmony/nest-schemas";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { Services, getService } from "@harmony/service-config";
import { ClientsModule } from "@nestjs/microservices";
import { RoleCreateService } from "./role-create.service";

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.AUTHORIZATION)]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleCreateService, RoleService],
  exports: [RoleCreateService, RoleService],
})
export class RoleModule {}
