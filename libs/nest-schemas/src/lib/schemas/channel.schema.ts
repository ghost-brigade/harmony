import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { Server } from "./server.schema";
import { Category } from "./category.schema";
import { Message } from "./message.schema";
import { ChannelType } from "@harmony/enums";

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Server" })
  server: Server;

  @Prop({ type: String, enum: ChannelType, default: ChannelType.TEXT })
  type: string;

  @Prop({ type: Types.ObjectId, ref: "Category", required: false })
  category: Category;

  @Prop({ type: Number, required: true })
  order: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Message" }] })
  messages: Message[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
export const ChannelModel = model<Channel>("Channel", ChannelSchema);
