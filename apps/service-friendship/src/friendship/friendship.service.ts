import {
  FormatZodResponse,
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
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel("Friendship") private readonly friendshipModel
  ) {}
  async createFriendship(
    payload: {
      receiver: IdType;
    },
    user: UserContextType
  ): Promise<FriendshipType> {
    console.log(payload)
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
        new BadRequestException("You cannot send a friend request because it already exists. ")
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

  public async findAll(
    payload: { params: FriendshipParamsType },
    user: UserContextType
  ): Promise<FriendshipType[]> {
    try {
      const friendships = await this.friendshipModel
        .find({
          $or: [
            { sender: user.id },
            { receiver: user.id }
          ]
        })
        .exec();
  
      return friendships as FriendshipType[];
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
