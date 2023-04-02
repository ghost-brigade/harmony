import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from './message.schema'
import { PrivateMessage } from './privateMessage.schema'

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
    @Prop({ type: Types.ObjectId, ref: 'message', required: false })
    message: Message;

    @Prop({ type: Types.ObjectId, ref: 'privateMessage', required: false })
    privateMessage: PrivateMessage;

    @Prop({ type: String, required: true })
    originalName: string;

    @Prop({ type: String, required: true })
    mimeType: string;

    @Prop({ type: String, required: true })
    url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
