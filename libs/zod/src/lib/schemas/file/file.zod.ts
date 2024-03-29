import { z } from "zod";
import { IdSchema } from "../id.zod";
import { createZodDto } from "nestjs-zod";

const _FileSchema = z.object({
  id: IdSchema.optional(),
  message: IdSchema.optional(),
  privateMessage: IdSchema.optional(),
  user: IdSchema.optional(),
  server: IdSchema.optional(),
  owner: IdSchema.optional(),
  originalName: z.string(),
  mimeType: z.string(),
  filename: z.string(),
  url: z.string(),
});

const _FileCreateSchema = _FileSchema.omit({
  originalName: true,
  mimeType: true,
  url: true,
  owner: true,
  filename: true,
});

const applyRefine = (
  data: z.infer<typeof _FileSchema> | z.infer<typeof _FileCreateSchema>
) => {
  const { message, privateMessage, user, server } = data;
  const propertyCount = [message, privateMessage, user, server].filter(
    Boolean
  ).length;

  return z.custom((value) => {
    if (propertyCount === 1) {
      return value;
    } else {
      throw new Error(
        "File must be associated with exactly one of message, private message, user, or server"
      );
    }
  });
};

export const FileSchema = _FileSchema.refine(applyRefine);
export const FilesSchema = z.array(FileSchema);
export const FileCreateSchema = _FileCreateSchema.refine(applyRefine);

export type FileType = z.infer<typeof FileSchema>;
export type FilesType = z.infer<typeof FilesSchema>;
export type FileCreateType = z.infer<typeof FileCreateSchema>;

export class FileDto extends createZodDto(FileSchema) {}
export class FileCreateDto extends createZodDto(FileCreateSchema) {}
