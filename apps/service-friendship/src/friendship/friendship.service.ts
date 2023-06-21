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
      const friendship = (await this.friendshipModel
        .find(payload.params)
        .exec()) as FriendshipType[];
      return friendship;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
