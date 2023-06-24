import { ZodIssue } from "nestjs-zod/z";

export const FormatZodResponse = (errors: ZodIssue[]): string => {
  const { code, path } = errors[0];
  return `error_${code}_${path[0]}`.toUpperCase();
};
