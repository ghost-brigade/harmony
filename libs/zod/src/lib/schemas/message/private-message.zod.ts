import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { Permissions } from "@harmony/enums";
import { UserSchema } from "../user/user.zod";

const IdSchema = z.string();

const PrivateMessageSchema = z.object({
  id: IdSchema,
  content: z.string(),
  author: IdSchema,
  receiver: IdSchema,
  attachment: z.array(IdSchema).optional(),
});

export const PrivateMessageCreateSchema = PrivateMessageSchema.omit({
  id: true,
  attachment: true,
});

export const PrivateMessageUpdateSchema = PrivateMessageSchema.omit({
  author: true,
  receiver: true,
  attachment: true,
});

export const PrivateMessageGetSchema = z.object({
  id: IdSchema,
  content: z.string(),
  author: IdSchema,
  receiver: IdSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  attachment: z.array(z.string()),
});

export const PrivateMessagePermissionSchema = z.nativeEnum(Permissions);

export const PrivateMessageZodSchema = PrivateMessageSchema;
export const PrivateMessageCreateZodSchema = PrivateMessageCreateSchema;

export type PrivateMessageType = z.infer<typeof PrivateMessageSchema>;
export type PrivateMessagePermissionType = z.infer<
  typeof PrivateMessagePermissionSchema
>;
export type PrivateMessageCreateType = z.infer<
  typeof PrivateMessageCreateSchema
>;
export type PrivateMessageUpdateType = z.infer<
  typeof PrivateMessageUpdateSchema
>;
export type PrivateMessageParamsType = z.infer<typeof PrivateMessageSchema>;
export type PrivateMessageGetType = z.infer<typeof PrivateMessageGetSchema>;

export class PrivateMessageDto extends createZodDto(PrivateMessageSchema) {}
export class PrivateMessageCreateDto extends createZodDto(
  PrivateMessageCreateSchema
) {}
export class PrivateMessageUpdateDto extends createZodDto(
  PrivateMessageUpdateSchema
) {}
