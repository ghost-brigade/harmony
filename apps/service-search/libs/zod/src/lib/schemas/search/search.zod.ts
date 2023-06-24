import { Folders } from "@harmony/enums";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SearchSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  resource: z.nativeEnum(Folders),
});

export const TypeSenseSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  resource: z.nativeEnum(Folders),
  type: z.string(),
});

export type SearchType = z.infer<typeof SearchSchema>;
export class SearchDto extends createZodDto(SearchSchema) {}
