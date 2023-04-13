import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.userService.internalFindByEmail(email);

    if (
      user &&
      (await this.userService.comparePassword(plainPassword, user.password)) &&
      (await this.userService.isUserAccountActive({ user: user }))
    ) {
      return user;
    }

    return null;
  }

  // TODO: handle error message with NestResponseService lib
  async login(email, pass) {
    if (!email || !pass) {
      throw new UnprocessableEntityException();
    }

    const user = await this.userService.internalFindByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
