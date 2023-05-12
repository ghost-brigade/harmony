import { UserJwtType } from '@harmony/zod';
import { Observable, firstValueFrom } from "rxjs";

export type RequestWithUser = Request & { user: Observable<UserJwtType> };

export const getUserFromRequest = async (request: RequestWithUser) => {
  return await firstValueFrom(request.user);
};
