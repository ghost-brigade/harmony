import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Server } from './server.schema';
import { Category } from './category.schema';

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Server' })
    server: Server;

    @Prop({ type: String, enum: ['TEXT', 'VOICE'], default: 'TEXT' })
    type: string;

    @Prop({ type: Types.ObjectId, ref: 'Category', required: false })
    category: Category;

    @Prop({ type: Number, required: true })
    order: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
