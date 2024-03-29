import { FriendType, IdType, UserContextType } from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FriendService {
  constructor(@InjectModel("Friend") private readonly friendModel) {}

  async newFriend(
    payload: {
      user1: IdType;
      user2: IdType;
    },
    user: UserContextType
  ): Promise<FriendType> {
    const existingFriend = await this.friendModel.find({
      $or: [
        { user1: payload.user1, user2: payload.user2 },
        { user1: payload.user2, user2: payload.user1 },
      ],
    });

    if (existingFriend.length > 0) {
      throw new RpcException(new BadRequestException("Friend already exists."));
    }

    try {
      const newFriend = new this.friendModel({
        user1: payload.user1,
        user2: payload.user2,
      });
      return await newFriend.save();
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error creating friend")
      );
    }
  }

  async deleteFriend(
    payload: {
      id: IdType;
    },
    user: UserContextType
  ): Promise<boolean> {
    try {
      const friend = await this.findFriend(
        {
          id: payload.id,
        },
        user
      );

      if (!friend) {
        throw new RpcException(new NotFoundException("Friend not found."));
      }

      return await this.friendModel.deleteOne({
        _id: friend.id,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error deleting friend.")
      );
    }
  }

  public async findAllFriends(user: UserContextType): Promise<FriendType[]> {
    try {
      const friends = await this.friendModel
        .find({
          $or: [{ user1: user.id }, { user2: user.id }],
        })
        .exec();

      return friends as FriendType[];
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async findFriend(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<FriendType> {
    try {
      const friend = await this.friendModel
        .findOne({ $or: [{ user1: payload.id }, { user2: payload.id }] })
        .exec();
      return friend as FriendType;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
  public async isFriend(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<boolean> {
    try {
      const friend = await this.friendModel
        .find({
          $or: [
            { user1: payload.id, user2: user.id },
            { user1: user.id, user2: payload.id },
          ],
        })
        .exec();
      if (friend.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
  public async findFriendWithUser(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<FriendType> {
    try {
      const friend = await this.friendModel
        .findOne({
          $or: [
            { user1: payload.id, user2: user.id },
            { user1: user.id, user2: payload.id },
          ],
        })
        .exec();
      if (!friend) {
        throw new RpcException(new NotFoundException("Friend not found."));
      }
      return { friend, user } as FriendType;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
