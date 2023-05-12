import { z } from "zod";

const IdSchema = z.string();

type IdType = z.infer<typeof IdSchema>;

export { IdSchema, IdType };
