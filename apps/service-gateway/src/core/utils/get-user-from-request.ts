import { UserJwtType } from '@harmony/zod';
import { Observable, firstValueFrom } from "rxjs";

export type RequestWithUser = Request & { user: Observable<UserJwtType> };

/**
 * @deprecated Use @UserContext() user: UserContextType
 *  to get user from request in your microservice.
 *  Send your microservice request with ServiceRequest from @harmony/nest-microservice
 *  instead of send from @nestjs/microservices
 *
 *  if your need example see:
 *      - apps/service-gateway/src/role/role.controller.ts
 *      - apps/service-role/src/role/role.controller.ts
 * @param request
 * @returns
 */
export const getUserFromRequest = async (request: RequestWithUser) => {
  return await firstValueFrom(request.user);
};
