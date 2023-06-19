import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ZodSchema } from "zod";

@Injectable()
export class ZodGuard implements CanActivate {
  constructor(
    private source: "body" | "query" | "params",
    private schema: ZodSchema
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const data = context.switchToHttp().getRequest()[this.source];
    const result = this.schema.safeParse(data);

    if (result.success === false) {
      throw new HttpException(
        {
          message: "Invalid request body",
          errors: result.error.errors,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return true;
  }
}
