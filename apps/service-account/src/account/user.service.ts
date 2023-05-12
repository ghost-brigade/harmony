import { genSalt, hash } from "bcryptjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  FormatZodResponse,
  UserProfileSchema,
  UserJwtType,
  UserCreateSchema,
  UserCreateType,
  UserPublicType,
  UserUpdateType,
  UserParamsSchema,
  UserParamsType,
  UserType,
} from "@harmony/zod";
import { RpcException } from "@nestjs/microservices";
import { Errors } from "@harmony/enums";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel) {}

  async create(createUser: UserCreateType): Promise<UserPublicType> {
    const result = UserCreateSchema.safeParse(createUser);

    if (result.success === false) {
      throw new RpcException(
        new UnprocessableEntityException(FormatZodResponse(result.error.issues))
      );
    }

    const isUnique = (await this.userModel
      .findOne()
      .or([{ username: createUser.username }, { email: createUser.email }])
      .exec()) as UserType;

    if (isUnique) {
      throw new RpcException(
        new UnprocessableEntityException(
          isUnique.username === createUser.username
            ? Errors.ERROR_USERNAME_ALREADY_EXISTS
            : Errors.ERROR_EMAIL_ALREADY_EXISTS
        )
      );
    }

    const createdUser = new this.userModel({
      ...createUser,
      password: await this.hashPassword(createUser.password),
    });

    return await createdUser.save();
  }

  async update(updateUser: UserUpdateType): Promise<UserPublicType> {
    const updatedUser = new this.userModel(updateUser);
    return await updatedUser.save();
  }

  async delete(id: string): Promise<null> {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    return await deletedUser;
  }

  async findAll(params: UserParamsType): Promise<UserPublicType[] | null> {
    const result = UserParamsSchema.safeParse(params);

    if (result.success === false) {
      console.table(result.error.message);
      throw new RpcException(
        new UnprocessableEntityException(result.error.message)
      );
    }

    return await this.userModel.find(params).exec();
  }

  async findOne(id: string): Promise<UserType | null> {
    return await this.userModel.findById(id).exec();
  }

  async findOneBy(params: UserType): Promise<UserType | null> {
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
    user?: UserPublicType | null;
  }): Promise<boolean> {
    if (!user && email) {
      user = await this.findOneBy({ email });
    }

    if (user) {
      return user.isVerified;
    }

    return false;
  }

  async profile({ user }: { user: UserJwtType }): Promise<UserType> {
    try {
      const result = UserProfileSchema.safeParse(
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
