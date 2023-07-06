import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";

export type PrivateMessageDocument = HydratedDocument<PrivateMessage>;

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
export class PrivateMessage {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  author: User;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  receiver: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: "File" }] })
  attachment: File[];
}

export const PrivateMessageSchema =
  SchemaFactory.createForClass(PrivateMessage);
export const PrivateMessageModel = model<PrivateMessage>(
  "PrivateMessage",
  PrivateMessageSchema
);
