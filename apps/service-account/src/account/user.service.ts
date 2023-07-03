import { UserAvatarService } from "./user-avatar.service";
import { map } from "rxjs";
import { genSalt, hash } from "bcryptjs";
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  FormatZodResponse,
  UserProfileSchema,
  UserCreateSchema,
  UserCreateType,
  UserPublicType,
  UserUpdateType,
  UserParamsSchema,
  UserParamsType,
  UserType,
  IdType,
  UsersPublicSchema,
  UserContextType,
  UsernameStatusType,
  UserPublicSchema,
  UserBanType,
  UserBanSchema,
  UserUpdateSchema,
} from "@harmony/zod";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Errors } from "@harmony/enums";
import { ObjectId } from "mongodb";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  AUTHORIZATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.AUTHORIZATION, "name"))
    private readonly clientAuthorization: ClientProxy,
    private readonly userAvatarService: UserAvatarService
  ) {}

  async isUsernameAvailable(
    payload: {
      username: string;
    },
    user: UserContextType
  ): Promise<UsernameStatusType> {
    if (!payload.username) {
      throw new RpcException(
        new BadRequestException("Username is required to check availability")
      );
    }

    const status = await this.usernameAlreadyExist(payload.username);

    return {
      username: payload.username,
      status: status ? "unavailable" : "available",
    };
  }

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

  async update(
    payload: {
      id: IdType;
      updateUser: UserUpdateType;
    },
    user: UserContextType
  ): Promise<UserPublicType> {
    const parse = UserUpdateSchema.safeParse(payload.updateUser);

    if (parse.success === false) {
      throw new RpcException(
        new UnprocessableEntityException(FormatZodResponse(parse.error.issues))
      );
    }

    if (payload?.updateUser?.password) {
      payload.updateUser.password = await this.hashPassword(
        payload.updateUser.password
      );
    }

    if (payload.id !== user.id) {
      throw new RpcException(
        new UnauthorizedException(
          "You are not authorized to perform this action."
        )
      );
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      payload.id,
      {
        $set: payload.updateUser,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new RpcException(new NotFoundException("User not found."));
    }

    return UserProfileSchema.parse(updatedUser);
  }

  async delete(id: string): Promise<null> {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    return await deletedUser;
  }

  async findAll(params: UserParamsType): Promise<UserPublicType[] | null> {
    if (
      (await this.serviceRequest.send({
        client: this.clientAuthorization,
        pattern: AUTHORIZATION_MESSAGE_PATTERN.IS_ADMIN,
        promise: true,
      })) === false
    ) {
      throw new RpcException(
        new BadRequestException("You are not authorized to perform this action")
      );
    }

    const result = UserParamsSchema.safeParse(params);

    if (result.success === false) {
      console.table(result.error.message);
      throw new RpcException(
        new UnprocessableEntityException(result.error.message)
      );
    }

    try {
      const users = await this.userModel.find(params).exec();

      return await Promise.all(
        users.map(async (user) => {
          const uObj = user.toObject();
          uObj.id = uObj._id.toString();

          if (uObj.avatar) {
            const avatar = await this.userAvatarService.getAvatar({
              id: uObj.avatar,
              object: false,
            });

            if (avatar) {
              uObj.avatar = avatar;
            } else {
              delete uObj.avatar;
            }
          }

          return UserPublicSchema.parse(uObj);
        })
      );
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while fetching users. Please try again later."
        )
      );
    }
  }

  async findAllByIds(payload: { ids: IdType[] }): Promise<UserPublicType[]> {
    const user = await this.userModel
      .find({ _id: { $in: payload.ids } }, { username: 1, email: 1, status: 1 })
      .exec();
    return user;
  }

  async findAllFriends(ids) {
    const array = ids.user2Array;
    const distinctUsers = Array.from(
      new Set([
        ...array.map((element) => element.user1),
        ...array.map((element) => element.user2),
      ])
    ).filter((element) => element !== ids._user.id);

    const blockedUserIds = ids._user.blockedUsers;
    const users = await this.userModel
      .find(
        { _id: { $in: distinctUsers } },
        { username: 1, email: 1, status: 1, blockedUsers: 1 }
      )
      .exec();

    const filteredUsers = users.filter(
      (user) => !blockedUserIds.includes(user.id)
    );
    console.log(ids._user.id);
    return filteredUsers;
  }
  async findAllBannedUsers(userContext: UserContextType) {
    console.log(userContext.id);
    const users = await this.userModel
      .findById(userContext.id, { blockedUsers: 1 })
      .exec();
    const blockedUsers = await this.userModel.find(
      { _id: { $in: users.blockedUsers } },
      { username: 1, email: 1, status: 1 }
    );
    return blockedUsers;
  }

  async findAllFriendRequest(ids) {
    const array = ids.user2Array;
    const distinctUsers = Array.from(
      new Set([
        ...array.map((element) => element.sender),
        ...array.map((element) => element.receiver),
      ])
    ).filter((element) => element !== ids._user.id);
    const blockedUserIds = ids._user.blockedUsers;
    const users = await this.userModel
      .find(
        { _id: { $in: distinctUsers } },
        { username: 1, email: 1, status: 1, blockedUsers: 1 }
      )
      .exec();
    const filteredUsers = users.filter(
      (user) => !blockedUserIds.includes(user.id)
    );
    return filteredUsers;
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

  async findOneByUsername(
    payload: { username: string },
    user: UserType
  ): Promise<UserPublicType> {
    try {
      return await this.userModel
        .findOne({
          username: payload.username,
        })
        .exec();
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

  private async findUserFromPayload(
    payload: {
      ids?: IdType[];
      emails?: string[];
      usernames?: string[];
    } = {},
    user?: UserContextType
  ): Promise<UserType[]> {
    try {
      const users = (await this.userModel
        .find()
        .or([
          { _id: { $in: payload?.ids } },
          { email: { $in: payload?.emails } },
          { username: { $in: payload?.usernames } },
        ])
        .exec()) as UserType[];

      return users;
    } catch (error) {
      if (error.message.includes("_id")) {
        throw new BadRequestException("Invalid ids provided");
      }

      //todo for email, username
      throw new RpcException(new UnprocessableEntityException());
    }
  }

  /* Return a list of users that are not active */
  async isUsersAccountActive(
    payload: {
      ids?: IdType[];
      emails?: string[];
      usernames?: string[];
    } = {},
    user?: UserContextType
  ): Promise<UserPublicType[]> {
    const users = await this.findUserFromPayload(payload, user);
    return users ? users.filter((user) => user.isVerified === false) : null;
  }

  async isUsersAccountExist(
    payload: {
      ids?: IdType[];
      emails?: string[];
      usernames?: string[];
    } = {},
    user?: UserContextType
  ): Promise<UserPublicType[]> {
    const users = await this.findUserFromPayload(payload, user);

    if (payload.ids) {
      return users.length === payload.ids.length ? users : null;
    } else if (payload.emails) {
      return users.length === payload.emails.length ? users : null;
    } else if (payload.usernames) {
      return users.length === payload.usernames.length ? users : null;
    }
  }

  async profile({ user }: { user: UserContextType }): Promise<UserType> {
    try {
      // @ts-ignore
      const profile = await this.findOneBy({ email: user.email });
      const result = UserProfileSchema.safeParse(profile);

      if (result.success === false) {
        throw new RpcException(
          new UnprocessableEntityException(
            FormatZodResponse(result.error.issues)
          )
        );
      }

      if (result.data.avatar) {
        const avatar = await this.userAvatarService.getAvatar({
          id: result.data.avatar,
          object: false,
        });

        if (typeof avatar === "string") {
          result.data.avatar = avatar;
        }
      }

      return result.data;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occured while fetching your profile"
        )
      );
    }
  }
  async banUser(
    payload: {
      id: IdType;
    },
    user: UserContextType
  ): Promise<Boolean> {
    const userId = payload.id;

    try {
      const userData = await this.userModel.findByIdAndUpdate(
        user.id,
        { $addToSet: { blockedUsers: payload.id } },
        { new: true }
      );
      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occured while fetching your profile"
        )
      );
    }
  }

  async cancelBanUser(
    payload: {
      id: IdType;
    },
    user: UserContextType
  ): Promise<Boolean> {
    const userId = payload.id;

    try {
      const userData = await this.userModel.findByIdAndUpdate(
        user.id,
        { $pull: { blockedUsers: userId } },
        { new: true }
      );
      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occured while fetching your profile"
        )
      );
    }
  }
}
