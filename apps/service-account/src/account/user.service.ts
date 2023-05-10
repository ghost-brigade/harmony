import { genSalt, hash } from "bcryptjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ProfileSchema,
  UserJwtType,
  createUserType,
  publicUserType,
  updateUserType,
  userParamsSchema,
  userParamsType,
  userSchema,
  userType,
} from "@harmony/zod";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel) {}

  async create(createUser: createUserType): Promise<publicUserType> {
    const createdUser = new this.userModel({
      ...createUser,
      password: await this.hashPassword(createUser.password),
    });
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

  async findAll(params: userParamsType): Promise<publicUserType[] | null> {
    const result = userParamsSchema.safeParse(params);

    if (result.success === false) {
      console.table(result.error.message);
      throw new RpcException(
        new UnprocessableEntityException(result.error.message)
      );
    }

    return await this.userModel.find(params).exec();
  }

  async findOne(id: string): Promise<userType | null> {
    return await this.userModel.findById(id).exec();
  }

  async findOneBy(params: userType): Promise<userType | null> {
    try {
      return await this.userModel.findOne(params).exec();
    } catch (error) {
      return null;
    }
  }

  /**
   * Checks if the username already exists in the database
   * @param username
   * @param email
   * @returns
   */
  async usernameAlreadyExist(username: string): Promise<boolean> {
    const user = await this.findOneBy({ username });
    return user !== null;
  }

  /**
   * Checks if the email already exists in the database
   * @param email
   * @returns
   */
  async emailAlreadyExist(email: string): Promise<boolean> {
    const user = await this.findOneBy({ email });
    return user !== null;
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, await genSalt(10));
  }

  async isUserAccountActive({
    email = null,
    user = null,
  }: {
    email?: string | null;
    user?: publicUserType | null;
  }): Promise<boolean> {
    if (!user && email) {
      user = await this.findOneBy({ email });
    }

    if (user) {
      return user.isVerified;
    }

    return false;
  }

  async profile({ user }: { user: UserJwtType }): Promise<userType> {
    try {
      const result = ProfileSchema.safeParse(
        await this.findOneBy({ email: user.email })
      );

      if (result.success === false) {
        throw new RpcException(
          new UnprocessableEntityException(result.error.message)
        );
      }

      return result.data;
    } catch (error) {
      return null;
    }
  }
}
