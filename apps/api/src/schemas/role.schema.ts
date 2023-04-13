import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { Server } from "./server.schema";
import { Permissions } from "@harmony/enums";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ type: Types.ObjectId, ref: "Server" })
  server: Server;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: String, enum: Permissions }] })
  permissions: Array<Permissions>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export const RoleModel = model<Role>("Role", RoleSchema);
