import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Channel } from './channel.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: User;

    @Prop({ type: Types.ObjectId, ref: 'Channel', required: false })
    channel: Channel;

    @Prop({ type: Types.ObjectId, ref: 'User', required: false })
    recipient: User;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'File' }] })
    attachment: File[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
