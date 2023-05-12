import { z } from "zod";
import { IdSchema } from "./global/id.zod";

/* temporary disable use IdSchema instead */
// const categorySchema = z.object({
//   id: IdSchema.optional(),
//   name: z.string(),
// });

// const channelSchema = z.object({
//   id: IdSchema.optional(),
//   name: z.string(),
// });

// const roleSchema = z.object({
//   id: IdSchema.optional(),
//   name: z.string(),
// });

// const emojiSchema = z.object({
//   id: z.string().optional(),
//   name: z.string(),
// });

export const ServerSchema = z.object({
  id: IdSchema.optional(),
  name: z.string(),
  owner: IdSchema.optional(),
  members: z.array(IdSchema).optional(),
  categories: z.array(IdSchema).optional(),
  channels: z.array(IdSchema).optional(),
  roles: z.array(IdSchema).optional(),
  emojis: z.array(IdSchema).optional(),
  cover: z.string().optional(),
});

export const ServerCreateSchema = ServerSchema.omit({
  id: true,
  avatar: true,
  isVerified: true,
  blockedUsers: true,
});

export const ServerMemberAddSchema = z.object({
  serverId: z.string(),
  memberId: z.string(),
});

export type ServerType = z.infer<typeof ServerSchema>;
export type ServerCreateType = z.infer<typeof ServerCreateSchema>;
export type ServerMemberAddType = z.infer<typeof ServerMemberAddSchema>;
