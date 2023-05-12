import { z } from "nestjs-zod/z";

export const IdSchema = z.string();
export type IdType = z.infer<typeof IdSchema>;
