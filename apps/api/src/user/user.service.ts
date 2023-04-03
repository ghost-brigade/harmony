import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../schemas";
import { UpdateUserDto } from "./dto";
import { compare, genSalt, hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = new this.userModel(updateUserDto);
        return await updatedUser.save();
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email: email } });
    }

    async hashPassword(password: string): Promise<string> {
        return await hash(password, await genSalt(10));
    }

    async comparePassword(plainPassword: string, password: string): Promise<boolean> {
        return await compare(plainPassword, password);
    }

    async isUserAccountActive({ email = null, user = null }: { email?: string | null, user?: User | null }): Promise<boolean> {
        if (!user && email) {
            user = await this.userModel.findOne({ where: { email: email } });
        }

        if (user) {
            return user.isVerified;
        }

        return false;
    }
}
