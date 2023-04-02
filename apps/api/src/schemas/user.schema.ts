import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, enum: ['ONLINE', 'INACTIVE', 'BUSY', 'OFFLINE'], default: 'OFFLINE' })
    status: string;

    @Prop({ type: String })
    avatar: string;

    @Prop({ type: Boolean, required: true })
    isVerified: boolean;

    @Prop({ type: String })
    blockedUsers: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
