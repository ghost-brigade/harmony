import {
  FormatZodResponse,
  FriendRequestParamsType,
  FriendRequestType,
  IdSchema,
  IdType,
  UserContextType,
} from "@harmony/zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { FriendService } from "../friend/friend.service";
import { ObjectId } from "mongoose";
import { getServiceProperty, Services } from "@harmony/service-config";
import { ServiceRequest } from "@harmony/nest-microservice";

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectModel("FriendRequest") private readonly friendrequestModel,
    @InjectModel("Friend") private readonly friendModel,
    private readonly friendService: FriendService,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}
  async createFriendRequest(
    payload: {
      username: string;
    },
    user: UserContextType
  ): Promise<FriendRequestType> {
    // useanem = string

    const userByUsername = await this.serviceRequest.send({
      client: this.accountService,
      pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE_BY_USERNAME,
      data: { username: payload.username },
      promise: true,
    });

    const receiver = userByUsername.id;

    if (receiver === user.id) {
      throw new RpcException(
        new BadRequestException("You cannot send a friend request to yourself.")
      );
    }
    const friendExists = await this.friendService.findFriend(
      { id: user.id },
      receiver
    );
    if (friendExists) {
      throw new RpcException(
        new BadRequestException("You are already friend with this user.")
      );
    }

    const existingFriendRequest = await this.friendrequestModel.findOne({
      sender: user.id,
      receiver: receiver,
    });

    if (existingFriendRequest) {
      throw new RpcException(
        new BadRequestException(
          "You cannot send a friend request because it already exists. "
        )
      );
    }

    try {
      const newRequest = new this.friendrequestModel({
        sender: user.id,
        receiver: receiver,
      });
      return await newRequest.save();
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error creating friend request")
      );
    }
  }

  public async findAll(user: UserContextType): Promise<FriendRequestType[]> {
    try {
      const friendrequests = await this.friendrequestModel
        .find({
          $or: [{ sender: user.id }, { receiver: user.id }],
        })
        .exec();

      return friendrequests as FriendRequestType[];
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  async findOneRequestFriend(
    friendrequestId: IdType,
    user: UserContextType
  ): Promise<FriendRequestType> {
    console.log("__________________________");
    console.log("findOneRequestFriend");
    console.log("__________________________");

    try {
      const friendrequest = await this.friendrequestModel.findOne({
        $or: [
          { sender: friendrequestId },
          { receiver: friendrequestId },
          { _id: friendrequestId },
        ],
      });

      if (!friendrequest) {
        throw new RpcException(
          new NotFoundException("FriendRequest not found.")
        );
      }

      return friendrequest;
    } catch (error) {
      throw new RpcException(
        new BadRequestException("Error finding friendrequest.")
      );
    }
  }

  async findOneRequestFriendWithUser(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<FriendRequestType> {
    console.log("__________________________");
    console.log("findOneRequestFriend");
    console.log("__________________________");

    try {
      const friendrequest = await this.friendrequestModel.findOne({
        $or: [
          { sender: payload.id },
          { receiver: payload.id },
          { _id: payload.id },
        ],
      });

      if (!friendrequest) {
        throw new RpcException(
          new NotFoundException("FriendRequest not found.")
        );
      }

      return { friendrequest, user } as FriendRequestType;
    } catch (error) {
      throw new RpcException(
        new BadRequestException("Error finding friendrequest.")
      );
    }
  }

  async acceptFriendRequest(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<boolean> {
    try {
      const friendrequest = await this.findOneRequestFriend(payload.id, user);

      if (!friendrequest) {
        throw new RpcException(
          new BadRequestException("FriendRequest not found.")
        );
      }

      if (friendrequest.receiver !== user.id) {
        throw new RpcException(
          new BadRequestException(
            "You are not authorized to accept this friendrequest."
          )
        );
      }

      await this.friendService.newFriend(
        { user1: friendrequest.sender, user2: friendrequest.receiver },
        user
      );
      return this.deleteFriendRequest({ id: user.id }, user);
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new BadRequestException("Error accepting friendrequest request.")
      );
    }
  }

  async rejectFriendRequest(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<boolean> {
    // const { id } = payload;

    try {
      const friendrequest = await this.findOneRequestFriend(payload.id, user);
      if (!friendrequest) {
        throw new RpcException(
          new BadRequestException("FriendRequest request not found.")
        );
      }

      if (friendrequest.receiver !== user.id) {
        throw new RpcException(
          new BadRequestException(
            "You are not authorized to reject this friendrequest."
          )
        );
      }

      return this.deleteFriendRequest({ id: user.id }, user);
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new BadRequestException("Error rejecting friendrequest.")
      );
    }
  }

  async deleteFriendRequest(
    payload: {
      id: IdType;
    },
    user: UserContextType
  ): Promise<boolean> {
    const parse = IdSchema.safeParse(payload.id);
    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    //check if friendrequest exists
    const friendrequest = await this.findOneRequestFriend(payload.id, user);
    if (!friendrequest) {
      throw new RpcException(
        new NotFoundException("FriendRequest request not found.")
      );
    }

    // if (friendrequest.sender !== user.id) {
    //   throw new RpcException(
    //     new UnauthorizedException("You are not authorized to delete this friendrequest request.")
    //   );
    // }

    try {
      await this.friendrequestModel.deleteOne({
        _id: friendrequest.id,
      });
      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "Error deleting friendrequest request."
        )
      );
    }
  }
}
