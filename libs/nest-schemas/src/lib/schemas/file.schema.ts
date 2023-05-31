import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { Message } from "./message.schema";
import { PrivateMessage } from "./privateMessage.schema";
import { User } from "./user.schema";
import { Server } from "./server.schema";

export type FileDocument = HydratedDocument<File>;

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
export class File {
  @Prop({ type: Types.ObjectId, ref: "message", required: false })
  message: Message;

  @Prop({ type: Types.ObjectId, ref: "privateMessage", required: false })
  privateMessage: PrivateMessage;

  @Prop({ type: Types.ObjectId, ref: "user", required: false })
  user: User;

  @Prop({ type: Types.ObjectId, ref: "server", required: false })
  server: Server;

  @Prop({ type: String, required: true })
  originalName: string;

  @Prop({ type: String, required: true })
  mimeType: string;

  @Prop({ type: String, required: true })
  url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
export const FileModel = model<File>("File", FileSchema);
