import { z } from 'zod';
import { userSchema } from './user.zod';

const categorySchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
});

const channelSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
});

const roleSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
});

const emojiSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
});

export const serverSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  owner: userSchema.optional(),
  members: z.array(userSchema).optional(),
  categories: z.array(categorySchema).optional(),
  channels: z.array(channelSchema).optional(),
  roles: z.array(roleSchema).optional(),
  emojis: z.array(emojiSchema).optional(),
  cover: z.string().optional(),
});

type serverType = z.infer<typeof serverSchema>;

export {
    serverSchema,
    serverType,
}