import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types, model } from "mongoose";
import { Roles, UserStatus } from "@harmony/enums";
import { File } from "./file.schema";

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

  @Prop({ type: { type: Types.ObjectId, ref: "File" } })
  avatar: File;

  @Prop({ type: Boolean })
  isVerified: boolean;

  @Prop({ type: String, enum: Roles, default: Roles.USER })
  role: string;

  @Prop({ type: String })
  blockedUsers: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model<User>("User", UserSchema);
