import { z } from "zod";

const IdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .length(24);

type IdType = z.infer<typeof IdSchema>;

export { IdSchema, IdType };
