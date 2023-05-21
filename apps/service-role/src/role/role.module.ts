import { NestMicroserviceModule } from '@harmony/nest-microservice';
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleSchema } from "@harmony/nest-schemas";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { Services, getService } from "@harmony/service-config";
import { ClientsModule } from "@nestjs/microservices";
import { RoleCreateService } from "./role-create.service";
import { RightService } from './right.service';
import { RightController } from './right.controller';

@Module({
  imports: [
    NestMicroserviceModule,
    ClientsModule.register([getService(Services.ACCOUNT)]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
  ],
  controllers: [RoleController, RightController],
  providers: [RoleCreateService, RoleService, RightService],
  exports: [RoleCreateService, RoleService],
})
export class RoleModule {}
