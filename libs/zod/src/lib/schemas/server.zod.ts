import { z } from "zod";
import { IdSchema } from "./global/id.zod";
import { createZodDto } from "nestjs-zod";

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
  owner: true,
  members: true,
  categories: true,
  channels: true,
  roles: true,
  emojis: true,
});

export const ServerUpdateSchema = z.object({
  name: z.string().optional(),
  owner: IdSchema.optional(),
  members: z.array(IdSchema).optional(),
  categories: z.array(IdSchema).optional(),
  channels: z.array(IdSchema).optional(),
  roles: z.array(IdSchema).optional(),
  emojis: z.array(IdSchema).optional(),
  cover: z.string().optional(),
});

export const ServerMemberAddSchema = z.object({
  serverId: z.string(),
  memberId: z.string(),
});

export const ServerMemberRemoveSchema = z.object({
  serverId: z.string(),
  memberId: z.string(),
});

export type ServerType = z.infer<typeof ServerSchema>;
export type ServerCreateType = z.infer<typeof ServerCreateSchema>;
export type ServerUpdateType = z.infer<typeof ServerUpdateSchema>;
export type ServerMemberAddType = z.infer<typeof ServerMemberAddSchema>;
export type ServerMemberRemoveType = z.infer<typeof ServerMemberRemoveSchema>;

export class ServerDto extends createZodDto(ServerSchema) {}
export class ServerCreateDto extends createZodDto(ServerCreateSchema) {}
export class ServerUpdateDto extends createZodDto(ServerUpdateSchema) {}
export class ServerMemberAddDto extends createZodDto(ServerMemberAddSchema) {}
export class ServerMemberRemoveDto extends createZodDto(ServerMemberRemoveSchema) {}
