import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { Permissions } from "@harmony/enums";

const IdSchema = z.string();

const FriendRequestSchema = z.object({
  id: IdSchema.optional(),
  sender: IdSchema,
  receiver: IdSchema,
});

const FriendRequestCreateSchema = FriendRequestSchema;

export const FriendRequestPermissionSchema = z.nativeEnum(Permissions);

export const FriendRequestZodSchema = FriendRequestSchema;
export const FriendRequestCreateZodSchema = FriendRequestCreateSchema;


export type FriendRequestType = z.infer<typeof FriendRequestSchema>;
export type FriendRequestPermissionType = z.infer<typeof FriendRequestPermissionSchema>;
export type FriendRequestCreateType = z.infer<typeof FriendRequestCreateSchema>;
export type FriendRequestParamsType = z.infer<typeof FriendRequestSchema>;

export class FriendRequestDto extends createZodDto(FriendRequestSchema) {}
export class FriendRequestCreateDto extends createZodDto(FriendRequestCreateSchema) {}
