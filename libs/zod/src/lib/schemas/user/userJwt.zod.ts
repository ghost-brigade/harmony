import { z } from "zod";

export const UserJwtSchema = z.object({
  /*
   * Email max length is 320 characters, according to RFC 3696
   * https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
   */
  email: z.string().email().min(3).max(320),
  iat: z.number().int().positive(),
  exp: z.number().int().positive(),
});

export type UserJwtType = z.infer<typeof UserJwtSchema>;
