import {
  FormatZodResponse,
  MessageParamsType,
  MessageType,
  MessageCreateType,
  IdSchema,
  IdType,
  UserContextType,
  MessageCreateSchema,
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
export class MessageService {
  constructor(
    @InjectModel("Message") private readonly messageModel,
  ) {}

  async newMessage(
    payload: {message: MessageCreateType},
    user: UserContextType
  ): Promise<MessageType> {
    const parse = MessageCreateSchema.safeParse(payload.message);
    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    try {
      const newMessage = new this.messageModel(payload.message);
      return await newMessage.save();
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error creating message")
      );
    }
  }

  async deleteMessage(
    payload: {
      id: IdType;
    },
    user: UserContextType
  ): Promise<boolean> {
    try {
      const messagerequest = await this.messageModel.findMessage({
        id: payload.id,
      });

      if (!messagerequest) {
        throw new RpcException(
          new NotFoundException("MessageRequest request not found.")
        );
      }

      if (messagerequest.sender !== user.id) {
        throw new RpcException(
          new UnauthorizedException(
            "You are not authorized to delete this messagerequest request."
          )
        );
      }

      await this.messageModel.deleteOne({
        _id: payload.id,
      });
      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error deleting message.")
      );
    }
  }

  public async findAll(
    user: UserContextType
  ): Promise<MessageType[]> {
    console.log("______________");
    console.log(user);
    console.log("______________");
    try {
      const messages = await this.messageModel
        .find({
          $or: [{ author: user.id }, { recipient: user.id }],
        })
        .exec() as MessageType[];

      return messages ;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async findMessage(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<MessageType> {
    try {
      const message = await this.messageModel
        .findOne({ $or: [{ user1: payload.id }, { user2: payload.id }] })
        .exec();

      if (!message) {
        throw new RpcException(
          new BadRequestException("Message does not exist.")
        );
      }

      return message as MessageType;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }
}
