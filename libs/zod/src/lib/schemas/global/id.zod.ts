import { z } from "nestjs-zod/z";

export const IdSchema = z.string();
export const IdArraySchema = z.array(IdSchema);

export type IdArray = z.infer<typeof IdArraySchema>;
export type IdType = z.infer<typeof IdSchema>;
