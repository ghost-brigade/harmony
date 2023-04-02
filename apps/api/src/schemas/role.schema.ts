import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Server } from './server.schema';
import { PERMISSIONS } from './enums/permissions.enum';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @Prop({ type: Types.ObjectId, ref: 'Server' })
    server: Server;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: [{ type: String, enum: PERMISSIONS }] })
    permissions: Array<PERMISSIONS>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
