import { compare } from "bcryptjs";
import { loginType, userType } from "@harmony/zod";
import { Services, getServiceProperty } from "@harmony/service-config";
import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user: userType = await firstValueFrom(
      this.accountService.send("account_find_one", { email })
    );
    console.log(user);

    // if (
    //   user &&
    //   (await this.userService.comparePassword(plainPassword, user.password)) &&
    //   (await this.userService.isUserAccountActive({ user: user }))
    // ) {
    //   return user;
    // }

    return null;
  }

  async login(loginType: loginType) {
    if (!loginType.email || !loginType.password) {
      throw new RpcException(
        new UnprocessableEntityException("Email and password are required")
      );
    }

    try {
      const user: userType = await firstValueFrom(
        this.accountService.send("account_find_one", { email: loginType.email })
      );

      if (!user) {
        throw new RpcException(
          new UnauthorizedException("Email or password is incorrect")
        );
      }

      const isPasswordValid = await this.comparePassword(
        loginType.password,
        user.password
      );

      if (!isPasswordValid) {
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

  async comparePassword(
    plainPassword: string,
    password: string
  ): Promise<boolean> {
    return await compare(plainPassword, password);
  }
}
