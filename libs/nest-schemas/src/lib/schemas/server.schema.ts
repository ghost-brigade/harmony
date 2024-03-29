import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { User } from "./user.schema";
import { Channel } from "./channel.schema";
import { Emoji } from "./emoji.schema";
import { Category } from "./category.schema";
import { Role } from "./role.schema";
import { File } from "./file.schema";

export type ServerDocument = HydratedDocument<Server>;

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

  @Prop({ type: { type: Types.ObjectId, ref: "File" } })
  icon: File;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  banned: User[];

  @Prop({ type: Boolean, default: true })
  private: boolean;
}

export const ServerSchema = SchemaFactory.createForClass(Server);
export const ServerModel = model<Server>("Server", ServerSchema);
