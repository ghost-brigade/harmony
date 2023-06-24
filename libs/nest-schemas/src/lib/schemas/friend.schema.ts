import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";

export type FriendDocument = HydratedDocument<Friend>;

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

export class Friend {

  @Prop({ type: String, required: true, unique: true })
  friendshipId: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user1: User;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user2: User;

}

export const FriendSchema = SchemaFactory.createForClass(Friend);
export const FriendModel = model<Friend>("Friend", FriendSchema);
