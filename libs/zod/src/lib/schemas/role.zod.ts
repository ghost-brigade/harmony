import { z } from "zod";
import { IdSchema } from "./id.zod";
import { createZodDto } from "nestjs-zod";

export const RoleUserSchema = z.array(IdSchema);
export const RolePermissionSchema = z.array(IdSchema);

export const RoleSchema = z.object({
  id: IdSchema,
  server: IdSchema,
  name: z.string().min(3).max(30),
  permissions: RolePermissionSchema.optional(),
  users: RoleUserSchema.optional(),
});

export const RoleParamsSchema = RoleSchema.pick({
  server: true,
  name: true,
}).partial();

export const RoleCreateSchema = RoleSchema.omit({ id: true });
export const RoleUpdateSchema = RoleSchema.pick({ name: true }).required();

export type RoleUserType = z.infer<typeof RoleUserSchema>;
export type RolePermissionType = z.infer<typeof RolePermissionSchema>;

export type RoleType = z.infer<typeof RoleSchema>;
export type RoleCreateType = z.infer<typeof RoleCreateSchema>;
export type RoleUpdateType = z.infer<typeof RoleUpdateSchema>;
export type RoleParamsType = z.infer<typeof RoleParamsSchema>;

export class RoleUserDto extends createZodDto(RoleUserSchema) {}
export class RolePermissionDto extends createZodDto(RolePermissionSchema) {}

export class RoleDto extends createZodDto(RoleSchema) {}
export class RoleCreateDto extends createZodDto(RoleCreateSchema) {}
export class RoleUpdateDto extends createZodDto(RoleUpdateSchema) {}
export class RoleParamsDto extends createZodDto(RoleParamsSchema) {}
