import { z } from "zod";
import { userSchema } from "./user.zod";

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const channelSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const roleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const emojiSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const serverSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  owner: userSchema.optional(),
  members: z.array(userSchema).optional(),
  categories: z.array(categorySchema).optional(),
  channels: z.array(channelSchema).optional(),
  roles: z.array(roleSchema).optional(),
  emojis: z.array(emojiSchema).optional(),
  cover: z.string().optional(),
});

const createServerSchema = serverSchema.omit({
  id: true,
  avatar: true,
  isVerified: true,
  blockedUsers: true,
});

const addMemberSchema = z.object({
  serverId: z.string(),
  memberId: z.string(),
});

type serverType = z.infer<typeof serverSchema>;
type createServerType = z.infer<typeof createServerSchema>;
type addMemberType = z.infer<typeof addMemberSchema>;

export { serverSchema, serverType, createServerSchema, createServerType, addMemberSchema, addMemberType };
