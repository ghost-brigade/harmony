import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { Permissions } from "@harmony/enums";

const IdSchema = z.string();

const FriendSchema = z.object({
  frienshipId: z.string().min(8).max(128),
  user1: IdSchema,
  user2: IdSchema,
});

const FriendCreateSchema = FriendSchema.omit({

});

export const FriendPermissionSchema = z.nativeEnum(Permissions);

export const FriendZodSchema = FriendSchema;
export const FriendCreateZodSchema = FriendCreateSchema;


export type FriendType = z.infer<typeof FriendSchema>;
export type FriendPermissionType = z.infer<typeof FriendPermissionSchema>;
export type FriendCreateType = z.infer<typeof FriendCreateSchema>;
export type FriendParamsType = z.infer<typeof FriendSchema>;

export class FriendDto extends createZodDto(FriendSchema) {}
export class FriendCreateDto extends createZodDto(FriendCreateSchema) {}
