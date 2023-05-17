import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { Server } from "./server.schema";
import { Permissions } from "@harmony/enums";

export type RoleDocument = HydratedDocument<Role>;

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
export class Role {
  @Prop({ type: Types.ObjectId, ref: "Server" })
  server: Server;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: String, enum: Permissions }] })
  permissions: Array<Permissions>;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  users: Array<Types.ObjectId>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export const RoleModel = model<Role>("Role", RoleSchema);
