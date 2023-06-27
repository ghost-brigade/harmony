import { ChannelType as ChannelTypeEnum } from "@harmony/enums";
import { IdSchema } from "@harmony/zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const ChannelSchema = z.object({
  id: IdSchema,
  name: z.string().min(1).max(30),
  server: IdSchema,
  type: z.nativeEnum(ChannelTypeEnum),
  //category: IdSchema.optional(),
  order: z.number().int().min(1).max(30).optional(),
  messages: z.array(IdSchema).optional(),
});

export const ChannelsSchema = z.array(ChannelSchema);

export const ChannelCreateSchema = z.object({
  name: z.string().min(1).max(30),
  server: IdSchema,
  type: z.nativeEnum(ChannelTypeEnum),
  order: z.number().int().min(1).max(30).optional(),
})

export const ChannelUpdateSchema = ChannelSchema.omit({
  id: true,
  server: true,
  messages: true,
  type: true,
});

export type ChannelType = z.infer<typeof ChannelSchema>;
export type ChannelsType = z.infer<typeof ChannelsSchema>;
export type ChannelCreateType = z.infer<typeof ChannelCreateSchema>;
export type ChannelUpdateType = z.infer<typeof ChannelUpdateSchema>;

export class ChannelDto extends createZodDto(ChannelSchema) {}
export class ChannelsDto extends createZodDto(ChannelsSchema) {}
export class ChannelCreateDto extends createZodDto(ChannelCreateSchema) {}
export class ChannelUpdateDto extends createZodDto(ChannelUpdateSchema) {}
