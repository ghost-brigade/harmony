import { ConfigModule } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from '@harmony/nest-schemas';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
