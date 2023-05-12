import { z } from "zod";
import { userSchema } from "./user.zod";
import { createZodDto } from "nestjs-zod";
import { IdSchema } from "./id.zod";

const categorySchema = z.object({
  id: IdSchema.optional(),
  name: z.string(),
});

const channelSchema = z.object({
  id: IdSchema.optional(),
  name: z.string(),
});

const roleSchema = z.object({
  id: IdSchema.optional(),
  name: z.string(),
});

const emojiSchema = z.object({
  id: IdSchema.optional(),
  name: z.string(),
});

const serverSchema = z.object({
  id: IdSchema.optional(),
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
  owner: true,
  members: true,
  categories: true,
  channels: true,
  roles: true,
  emojis: true,
});

const addMemberSchema = z.object({
  serverId: IdSchema,
  memberId: IdSchema,
});

type serverType = z.infer<typeof serverSchema>;
type createServerType = z.infer<typeof createServerSchema>;
type addMemberType = z.infer<typeof addMemberSchema>;

class createServerDto extends createZodDto(createServerSchema) {}

export {
  serverSchema,
  serverType,
  createServerSchema,
  createServerType,
  createServerDto,
  addMemberSchema,
  addMemberType,
};
