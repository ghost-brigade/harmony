import { z } from "zod";
import { UserSchema } from "./user.zod";

export const UserContextSchema = UserSchema.omit({
  password: true,
});

export type UserContextType = z.infer<typeof UserContextSchema>;
