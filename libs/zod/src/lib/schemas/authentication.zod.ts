import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type loginType = z.infer<typeof loginSchema>;

class LoginDto extends createZodDto(loginSchema) { }

export {
    loginSchema,
    loginType,
    LoginDto
}