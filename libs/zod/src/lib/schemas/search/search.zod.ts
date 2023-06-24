import { IdSchema } from "@harmony/zod";
import { Folders } from "@harmony/enums";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SearchSchema = z.object({
  id: z.string().uuid(),
  channelId: IdSchema,
  content: z.string(),
  resource: z.nativeEnum(Folders),
});

export const SearchCreateSchema = SearchSchema.omit({ resource: true });
export const SearchUpdateSchema = SearchSchema.omit({
  id: true,
  channelId: true,
  resource: true,
});

export const SearchResponseSchema = z.object({
  id: IdSchema,
  author_id: IdSchema,
  content: z.string(),
  channel_id: IdSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export const TypeSenseSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  channelId: IdSchema,
  resource: z.nativeEnum(Folders),
  type: z.string(),
});

export type SearchType = z.infer<typeof SearchSchema>;
export type SearchCreateType = z.infer<typeof SearchCreateSchema>;
export type SearchUpdateType = z.infer<typeof SearchUpdateSchema>;
export type SearchResponseType = z.infer<typeof SearchResponseSchema>;

export class SearchDto extends createZodDto(SearchSchema) {}
export class SearchCreateDto extends createZodDto(SearchCreateSchema) {}
export class SearchUpdateDto extends createZodDto(SearchUpdateSchema) {}
