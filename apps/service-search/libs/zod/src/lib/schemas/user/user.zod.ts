import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { IdSchema } from "../global/id.zod";
import { Roles } from "@harmony/enums";

const UserRoleSchema = z.nativeEnum(Roles).default(Roles.USER);

export const UserSchema = z.object({
  /*
   * Email max length is 320 characters, according to RFC 3696
   * https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
   */
  id: IdSchema.optional(),
  email: z.string().email().min(3).max(320),
  password: z.string().min(8).max(128),
  username: z.string().min(4).max(18),
  status: z.string().optional(),
  avatar: z.array(IdSchema.optional()),
  isVerified: z.boolean().optional(),
  role: UserRoleSchema.optional(),
  blockedUsers: z.array(IdSchema).optional(),
});

export const UsersSchema = z.array(UserSchema);

export const UserProfileSchema = UserSchema.omit({
  password: true,
});

export const UserPublicSchema = UserSchema.omit({
  password: true,
  blockedUsers: true,
});

export const UsersPublicSchema = z.array(UserPublicSchema);

export const UserParamsSchema = UserSchema.pick({
  id: true,
  email: true,
  username: true,
}).partial();

export const UserCreateSchema = UserSchema.omit({
  id: true,
  avatar: true,
  isVerified: true,
  blockedUsers: true,
  status: true,
});

const UserUpdateSchema = UserSchema.omit({
  username: true,
  blockedUsers: true,
  isVerified: true,
}).partial();

export type UserType = z.infer<typeof UserSchema>;
export type UserPublicType = z.infer<typeof UserPublicSchema>;
export type UserParamsType = z.infer<typeof UserParamsSchema>;
export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;

export class UserPublicDto extends createZodDto(UserParamsSchema) {}
export class UserCreateDto extends createZodDto(UserCreateSchema) {}
export class UserUpdateDto extends createZodDto(UserUpdateSchema) {}