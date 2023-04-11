import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, plainPassword: string): Promise<any> {
        const user = await this.userService.internalFindByEmail(email);

        if (
            user &&
            await this.userService.comparePassword(plainPassword, user.password) &&
            await this.userService.isUserAccountActive({ user: user })
        ) {
            return user;
        }

        return null;
    }

    async login(user: LoginDto): Promise<{ access_token: string }> {
        return {
            access_token: this.jwtService.sign({ email: user.email }),
        };
    }
}