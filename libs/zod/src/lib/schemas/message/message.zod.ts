import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { Permissions } from "@harmony/enums";

const IdSchema = z.string();

const MessageSchema = z.object({
  id: IdSchema.optional(),
  content: z.string(),
  author: IdSchema,
  channel: IdSchema,
  recipient: IdSchema,
  attachment: z.array(IdSchema).optional(),
});

export const MessageCreateSchema = MessageSchema.omit({id:true});

export const MessagePermissionSchema = z.nativeEnum(Permissions);

export const MessageZodSchema = MessageSchema;
export const MessageCreateZodSchema = MessageCreateSchema;

export type MessageType = z.infer<typeof MessageSchema>;
export type MessagePermissionType = z.infer<typeof MessagePermissionSchema>;
export type MessageCreateType = z.infer<typeof MessageCreateSchema>;
export type MessageParamsType = z.infer<typeof MessageSchema>;

export class MessageDto extends createZodDto(MessageSchema) {}
export class MessageCreateDto extends createZodDto(MessageCreateSchema) {}