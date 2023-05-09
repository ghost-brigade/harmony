import { z } from 'zod';

const userSchema = z.object({
    /*
     * Email max length is 320 characters, according to RFC 3696
     * https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
    */
    email: z.string().email().min(3).max(320),
    password: z.string().min(8).max(128),
    username: z.string().min(4).max(18),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional(),
    blockedUsers: z.array(z.string()).optional(),
    id: z.string().optional(),
});

const publicUserSchema = userSchema.omit({
    password: true,
    blockedUsers: true,
});

const createUserSchema = userSchema.omit({
    id: true,
    avatar: true,
    isVerified: true,
    blockedUsers: true,
});

const updateUserSchema = userSchema.omit({
    username: true,
    blockedUsers: true,
    isVerified: true,
}).partial();

const userParamsSchema = userSchema.pick({
    id: true,
    email: true,
    username: true,
}).partial();

type userType = z.infer<typeof userSchema>;
type publicUserType = z.infer<typeof publicUserSchema>;
type updateUserType = z.infer<typeof updateUserSchema>;
type createUserType = z.infer<typeof createUserSchema>;
type userParamsType = z.infer<typeof userParamsSchema>;

export {
    userSchema,
    userType,
    publicUserSchema,
    publicUserType,
    updateUserSchema,
    updateUserType,
    createUserSchema,
    createUserType,
    userParamsSchema,
    userParamsType,
}
