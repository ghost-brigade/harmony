import { z } from "zod";
import { UserSchema } from "./user.zod";
import { createZodDto } from "nestjs-zod";

const username = UserSchema.pick({ username: true });

export const UsernameStatusSchema = z
  .object({
    status: z.enum(["available", "unavailable"]),
  })
  .merge(username);

export type UsernameStatusType = z.infer<typeof UsernameStatusSchema>;
export class UsernameStatusDto extends createZodDto(UsernameStatusSchema) {}
