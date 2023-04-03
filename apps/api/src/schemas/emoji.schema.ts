import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Server } from './server.schema';

export type EmojiDocument = HydratedDocument<Emoji>;

@Schema()
export class Emoji {
    @Prop({ type: Types.ObjectId, ref: 'Server' })
    server: Server;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    image: string;
}

export const EmojiSchema = SchemaFactory.createForClass(Emoji);
