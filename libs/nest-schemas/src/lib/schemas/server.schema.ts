import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";
import { Channel } from "./channel.schema";
import { Emoji } from "./emoji.schema";
import { Category } from "./category.schema";
import { Role } from "./role.schema";

export type ServerDocument = HydratedDocument<Server>;

@Schema({ timestamps: true })
export class Server {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  owner: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  members: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Category" }] })
  categories: Category[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Channel" }] })
  channels: Channel[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Role" }] })
  roles: Role[];

  @Prop({ type: [{ type: Types.ObjectId, ref: "Emoji" }] })
  emojis: Emoji[];

  @Prop({ type: String, required: false })
  cover: string;
}

export const ServerSchema = SchemaFactory.createForClass(Server);
export const ServerModel = model<Server>("Server", ServerSchema);
