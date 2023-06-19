import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";

export type FriendshipDocument = HydratedDocument<Friendship>;

@Schema({ timestamps: true })
export class Friendship {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  sender: User;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  receiver: User;

  @Prop({
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  })
  status: string;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
export const FriendshipModel = model<Friendship>(
  "Friendship",
  FriendshipSchema
);
