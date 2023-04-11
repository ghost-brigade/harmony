import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "./user.schema";

export type PrivateGroupDocument = HydratedDocument<PrivateGroup>;

@Schema({ timestamps: true })
export class PrivateGroup {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  participants: User[];

  @Prop({ type: String })
  avatar: string;
}

export const PrivateGroupSchema = SchemaFactory.createForClass(PrivateGroup);
