import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";

export type FriendRequestDocument = HydratedDocument<FriendRequest>;

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

export class FriendRequest {
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

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
export const FriendRequestModel = model<FriendRequest>("FriendRequest", FriendRequestSchema);
