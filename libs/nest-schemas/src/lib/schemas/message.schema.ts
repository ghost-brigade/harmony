import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";
import { Channel } from "./channel.schema";

export type MessageDocument = HydratedDocument<Message>;

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
export class Message {
  @Prop({ type: String, required: false, default: "" })
  content: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  author: User;

  @Prop({ type: Types.ObjectId, ref: "Channel", required: false })
  channel: Channel;

  @Prop({ type: Types.ObjectId, ref: "User", required: false })
  recipient: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: "File" }] })
  attachment: File[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel = model<Message>("Message", MessageSchema);
