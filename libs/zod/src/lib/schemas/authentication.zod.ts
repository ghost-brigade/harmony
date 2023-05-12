import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginType = z.infer<typeof LoginSchema>;
export class LoginDto extends createZodDto(LoginSchema) {}
