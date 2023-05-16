import { z } from "zod";
import { IdSchema } from "./id.zod";

export const RoleSchema = z.object({
  id: IdSchema,
  name: z.string(),
  permissions: z.array(z.string()).optional(),
  users: z.array(IdSchema).optional(),
});

export type RoleType = z.infer<typeof RoleSchema>;
