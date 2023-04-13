import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { createUserType, publicUserType, updateUserType, userType } from "@harmony/zod";
import { compare, genSalt, hash } from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel) {}

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

  async findAll(): Promise<publicUserType[] | null> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<publicUserType | null> {
    return await this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<publicUserType | null> {
    return await this.userModel.find({ username }).exec();
  }

  async findByEmail(email: string): Promise<publicUserType | null> {
    return await this.userModel.find({ email }).exec();
  }

  async internalFindByEmail(email: string): Promise<userType | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async internalFindByUsername(username: string): Promise<userType | null> {
    return await this.userModel.find({ username }).exec();
  }

  /**
   * Checks if the username already exists in the database
   * @param username
   * @param email
   * @returns
   */
  async usernameAlreadyExist(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null;
  }

  /**
   * Checks if the email already exists in the database
   * @param email
   * @returns
   */
  async emailAlreadyExist(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, await genSalt(10));
  }

  async comparePassword(plainPassword: string, password: string): Promise<boolean> {
    return await compare(plainPassword, password);
  }

  async isUserAccountActive({email = null, user = null}: {email?: string|null, user?: publicUserType|null}): Promise<boolean> {
    if (!user && email) {
      user = await this.findByEmail(email);
    }

    if (user) {
        return await user.isVerified;
    }

    return false;
  }
  
}
