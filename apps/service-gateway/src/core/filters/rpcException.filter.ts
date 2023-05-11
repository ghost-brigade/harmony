import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (process.env.NODE_ENV === "development") {
      console.error("DEBUG MODE", exception, error);
    }

    response.status(error?.statusCode || 500).json(error);
  }
}
