import { compare } from "bcryptjs";
import {
  LoginType,
  UserContextSchema,
  UserJwtType,
  UserType,
} from "@harmony/zod";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { jwtConstants } from "../constants/jwt.constants";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    private jwtService: JwtService
  ) {}

  async validateUser(user: UserType) {
    // if (
    //   user &&
    //   (await this.comparePassword(plainPassword, user.password)) &&
    //   (await this.userService.isUserAccountActive({ user: user }))
    // ) {
    //   return user;
    // }

    return null;
  }

  async login(loginType: LoginType) {
    if (!loginType.email || !loginType.password) {
      throw new RpcException(
        new UnprocessableEntityException("Email and password are required")
      );
    }

    try {
      const user: UserType = await firstValueFrom(
        this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
          email: loginType.email,
          auth: true,
        })
      );

      if (!user) {
        throw new RpcException(
          new UnauthorizedException("Email or password is incorrect")
        );
      }

      this.validateUser(user);

      const isPasswordValid = await this.comparePassword(
        loginType.password,
        user.password
      );

      if (isPasswordValid === false) {
        throw new RpcException(
          new UnauthorizedException("Email or password is incorrect")
        );
      }

      const payload = { email: user.email, sub: user.id };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new RpcException(
        new UnauthorizedException("Email or password is incorrect")
      );
    }
  }

  async JwtLogin(access_token: string) {
    try {
      const payload: UserJwtType = await this.jwtService.verifyAsync(
        access_token,
        {
          secret: jwtConstants.secret,
        }
      );

      const user = await firstValueFrom(
        this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
          email: payload.email,
          auth: true,
        })
      );

      const parse = UserContextSchema.safeParse(user);
      if (parse.success === false) {
        //TODO: Log error
        console.log(parse.error);
      }

      return user;
    } catch {
      throw new RpcException(
        new UnauthorizedException("Token is invalid or expired")
      );
    }
  }

  async comparePassword(
    plainPassword: string,
    password: string
  ): Promise<boolean> {
    return await compare(plainPassword, password);
  }
}
