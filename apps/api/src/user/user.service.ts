import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { createUserType, publicUserType, updateUserType } from "@harmony/zod";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel) {}

    async create(createUser: createUserType): Promise<publicUserType> {
        const createdUser = new this.userModel(createUser);
        return await createdUser.save();
    }

    async update(updateUser: updateUserType): Promise<publicUserType> {
        const updatedUser = new this.userModel(updateUser);
        return await updatedUser.save();
    }

    async delete(id: string): Promise<null> {
        const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
        return await deletedUser;
    }

    async findAll(): Promise<publicUserType[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id: string): Promise<publicUserType> {
        return await this.userModel.findById(id).exec();
    }
}
