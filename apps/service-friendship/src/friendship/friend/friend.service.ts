import {
  FormatZodResponse,
  FriendParamsType,
  FriendType,
  IdSchema,
  IdType,
  UserContextType,
} from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FriendService {
  constructor(
    @InjectModel("FriendRequest") private readonly friendrequestModel,
    @InjectModel("Friend") private readonly friendModel
  ) {}

  async newFriend(
    payload: {
      user1: IdType;
      user2: IdType;
    },
    user: UserContextType
  ): Promise<FriendType> {
    console.log(payload);
    const parse = IdSchema.safeParse(payload.user1);
    if (parse.success === false) {
      console.log(parse.error);
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const { user1, user2 } = payload;

    const sortedUsers = [user1, user2].sort();

    const friendrequest_Id = sortedUsers.join("-");

    const existingFriendRequest = await this.findFriend({id: payload.user2}, user);
    console.log(existingFriendRequest);

    if (existingFriendRequest) {
      throw new RpcException(
        new BadRequestException("FriendRequest already exists.")
      );
    }

    try {
      const newFriend = new this.friendModel({
        friendshipId: friendrequest_Id,
        user1: user.id,
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
      // const friendrequest = await this.friendrequestModel.findById(friendrequestId);

      // if (!friendrequest) {
      //   throw new RpcException(
      //     new NotFoundException("FriendRequest request not found.")
      //   );
      // }

      // if (friendrequest.sender !== userId) {
      //   throw new RpcException(
      //     new UnauthorizedException("You are not authorized to delete this friendrequest request.")
      //   );
      // }

      await this.friendModel.deleteOne({
        _id: payload.id,
      });
      console.log("deleted");
      return true;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error deleting friend.")
      );
    }
  }

  public async findAllFriends(
    payload: { params: FriendParamsType },
    user: UserContextType
  ): Promise<FriendType[]> {
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

      if (!friend) {
        throw new RpcException(
          new BadRequestException("Friend does not exist.")
        );
      }

      return friend as FriendType;
    } catch (error) {
      console.log(error);
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
