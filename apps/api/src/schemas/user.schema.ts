import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, model } from 'mongoose';
import { USER_STATUS } from './enums/userStatus.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, enum: USER_STATUS, default: USER_STATUS.OFFLINE })
    status: string;

    @Prop({ type: String })
    avatar: string;

    @Prop({ type: Boolean })
    isVerified: boolean;

    @Prop({ type: String })
    blockedUsers: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel  = model<User>('User', UserSchema);
