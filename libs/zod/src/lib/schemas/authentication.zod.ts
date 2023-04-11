import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type loginType = z.infer<typeof loginSchema>;

export {
    loginSchema,
    loginType,
}