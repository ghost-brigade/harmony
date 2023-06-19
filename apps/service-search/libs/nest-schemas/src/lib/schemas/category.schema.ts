import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, model } from "mongoose";
import { Server } from "./server.schema";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Server" })
  server: Server;

  @Prop({ type: Number, required: true })
  order: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export const CategoryModel = model<Category>("Category", CategorySchema);
