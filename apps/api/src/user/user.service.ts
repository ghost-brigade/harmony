import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../schemas";
import { UpdateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel) {}

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
}
