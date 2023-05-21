import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, model } from "mongoose";
import { Roles, UserStatus } from "@harmony/enums";

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.OFFLINE })
  status: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Boolean })
  isVerified: boolean;

  @Prop({ type: String, enum: Roles, default: Roles.USER })
  role: string;

  @Prop({ type: String })
  blockedUsers: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model<User>("User", UserSchema);
