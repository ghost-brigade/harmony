import {
  FormatZodResponse,
  FriendParamsType,
  FriendType,
  FriendshipCreateType,
  FriendshipParamsType,
  FriendshipType,
  IdSchema,
  IdType,
  UserContextType,
} from "@harmony/zod";
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
export class FriendshipService {
  constructor(
    @InjectModel("Friendship") private readonly friendshipModel,
    @InjectModel("Friend") private readonly friendModel
  ) {}
  async createFriendship(
    payload: {
      receiver: IdType;
    },
    user: UserContextType
  ): Promise<FriendshipType> {
    console.log(payload);
    const parse = IdSchema.safeParse(payload.receiver);
    if (parse.success === false) {
      console.log(parse.error);
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const receiver = parse.data;

    if (receiver === user.id) {
      throw new RpcException(
        new BadRequestException("You cannot send a friend request to yourself.")
      );
    }

    const existingFriendship = await this.friendshipModel.findOne({
      sender: user.id,
      receiver: receiver,
    });

    if (existingFriendship) {
      throw new RpcException(
        new BadRequestException(
          "You cannot send a friend request because it already exists. "
        )
      );
    }

    try {
      const newRole = new this.friendshipModel({
        sender: user.id,
        receiver: receiver,
        status: "PENDING",
      });
      return await newRole.save();
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error creating role")
      );
    }
  }

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

  const friendship_Id = sortedUsers.join('-');
    console.log("____________________________________");
    console.log(friendship_Id);
    console.log("____________________________________");

    const existingFriendship = await this.friendModel.findOne({ friendship_Id });
    console.log(existingFriendship);

    if (existingFriendship) {
      throw new RpcException(
        new BadRequestException("Friendship already exists.")
      );
    }

    try {
      const newFriend = new this.friendModel({
        friendshipId: friendship_Id,
        user1: user.id,
        user2: user.id,
      });
      return await newFriend.save();
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error creating role")
      );
    }
  }

  public async findAll(
    payload: { params: FriendshipParamsType },
    user: UserContextType
  ): Promise<FriendshipType[]> {
    try {
      const friendships = await this.friendshipModel
        .find({
          $or: [{ sender: user.id }, { receiver: user.id }],
        })
        .exec();

      return friendships as FriendshipType[];
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
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

  async findOneRequestFriend(
    friendshipId: IdType,
    user: UserContextType
  ): Promise<FriendshipType> {
    try {
      const friendship = await this.friendshipModel.findOne({
        _id: friendshipId,
        $or: [{ sender: user.id }, { receiver: user.id }],
      });

      if (!friendship) {
        throw new RpcException(
          new NotFoundException("Friendship request not found.")
        );
      }

      return friendship;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new BadRequestException("Error finding friendship request.")
      );
    }
  }

  async acceptFriendRequest(
    payload: { friendshipId: IdType },
    user: UserContextType
  ): Promise<FriendshipType> {
    const { friendshipId } = payload;

    try {
      const friendship = await this.friendshipModel.findById(friendshipId);

      if (!friendship) {
        throw new RpcException(
          new BadRequestException("Friendship request not found.")
        );
      }

      

      // if (friendship.receiver !== user.id) {
      //   throw new RpcException(
      //     new BadRequestException(
      //       "You are not authorized to accept this friendship request."
      //     )
      //   );
      // }

      await this.newFriend({ user1: friendship.sender, user2: friendship.receiver }, user);
      return this.friendshipModel.deleteOne({
        _id: friendshipId,
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new BadRequestException("Error accepting friendship request.")
      );
    }
  }

  async rejectFriendRequest(
    payload: { friendshipId: IdType },
    user: UserContextType
  ): Promise<FriendshipType> {

    const { friendshipId } = payload;

    try {

      const friendship = await this.friendshipModel.findOne({
        _id: friendshipId,
      });
      if (!friendship) {
        throw new RpcException(
          new BadRequestException("Friendship request not found. erterterte")
        );
      }

      if (friendship.receiver !== user.id) {
        throw new RpcException(
          new BadRequestException(
            "You are not authorized to reject this friendship request."
          )
        );
      }

      friendship.status = "REJECTED";
      await friendship.save();
      return await this.friendshipModel.deleteOne({
        _id: friendshipId,
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new BadRequestException("Error rejecting friendship request.")
      );
    }
  }

  async deleteFriendship(
    payload: { 
      id: IdType
     },
     user: UserContextType
     ): Promise<boolean> {
      const parse = IdSchema.safeParse(payload.id);
      if (parse.success === false) {
        throw new RpcException(
          new BadRequestException(FormatZodResponse(parse.error.issues))
        );
      }

      //check if friendship exists
      const friendship = await this.friendshipModel.findOne({
        _id: payload.id,
        $or: [{ sender: user.id }, { receiver: user.id }],
      });

      if (!friendship) {
        throw new RpcException(
          new NotFoundException("Friendship request not found.")
        );
      }

    

    try {
      // const friendship = await this.friendshipModel.findById(friendshipId);

      // if (!friendship) {
      //   throw new RpcException(
      //     new NotFoundException("Friendship request not found.")
      //   );
      // }

      // if (friendship.sender !== userId) {
      //   throw new RpcException(
      //     new UnauthorizedException("You are not authorized to delete this friendship request.")
      //   );
      // }

      await this.friendshipModel.deleteOne({
        _id: payload.id,
      });
      console.log("deleted");
      return true;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error deleting friendship request.")
      );
    }
  }
}
