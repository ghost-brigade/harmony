import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { IS_PUBLIC_ROUTE_KEY } from "./../../constants/guard.constant";
import { firstValueFrom } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isPublicRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.authenticationService.jwtLogin(token);
      request["user"] = await firstValueFrom(payload);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: any) {
    if (!request.headers.authorization) {
      return null;
    }
    const token = request.headers.authorization.replace("Bearer ", "");
    return token;
  }
}
