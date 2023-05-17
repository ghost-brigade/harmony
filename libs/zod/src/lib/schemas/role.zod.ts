import { z } from "zod";
import { IdSchema } from "./id.zod";
import { createZodDto } from "nestjs-zod";

export const RoleSchema = z.object({
  id: IdSchema,
  server: IdSchema,
  name: z.string(),
  permissions: z.array(z.string()).optional(),
  users: z.array(IdSchema).optional(),
});

export const RoleCreateSchema = RoleSchema.omit({ id: true });

export type RoleType = z.infer<typeof RoleSchema>;
export type RoleCreateType = z.infer<typeof RoleCreateSchema>;

export class RoleDto extends createZodDto(RoleSchema) {}
export class RoleCreateDto extends createZodDto(RoleCreateSchema) {}
