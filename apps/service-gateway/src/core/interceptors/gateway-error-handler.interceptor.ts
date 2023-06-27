import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class GatewayErrorHandlerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isGatewayErrorHandlerDisable = Reflect.getMetadata(
      "GATEWAY_ERROR_HANDLER_DISABLE_KEY",
      context.getHandler()
    );

    if (isGatewayErrorHandlerDisable) {
      return next.handle();
    }

    return next.handle().pipe(
      catchError((error) =>
        throwError(() => {
          console.log("error", error);
          return new RpcException(error.response);
        })
      )
    );
  }
}
