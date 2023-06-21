import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { Permissions } from "@harmony/enums";

const IdSchema = z.string();

const FriendshipSchema = z.object({
  sender: IdSchema,
  receiver: IdSchema,
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).default("PENDING"),
});

const FriendshipCreateSchema = FriendshipSchema.omit({
  status: true,
});

export const FriendshipPermissionSchema = z.nativeEnum(Permissions);

export const FriendshipZodSchema = FriendshipSchema;
export const FriendshipCreateZodSchema = FriendshipCreateSchema;


export type FriendshipType = z.infer<typeof FriendshipSchema>;
export type FriendShipPermissionType = z.infer<typeof FriendshipPermissionSchema>;
export type FriendshipCreateType = z.infer<typeof FriendshipCreateSchema>;
export type FriendshipParamsType = z.infer<typeof FriendshipSchema>;

export class FriendshipDto extends createZodDto(FriendshipSchema) {}
export class FriendshipCreateDto extends createZodDto(FriendshipCreateSchema) {}
