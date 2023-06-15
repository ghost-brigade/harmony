import { z } from "zod";
import { createZodDto } from "nestjs-zod";

const IdSchema = z.string();

const FriendshipSchema = z.object({
  sender: IdSchema,
  receiver: IdSchema,
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).default("PENDING"),
});

const FriendshipCreateSchema = FriendshipSchema.omit({
  status: true,
});

export const FriendshipZodSchema = FriendshipSchema;
export const FriendshipCreateZodSchema = FriendshipCreateSchema;

export type FriendshipType = z.infer<typeof FriendshipSchema>;
export type FriendshipCreateType = z.infer<typeof FriendshipCreateSchema>;

export class FriendshipDto extends createZodDto(FriendshipSchema) {}
export class FriendshipCreateDto extends createZodDto(FriendshipCreateSchema) {}
