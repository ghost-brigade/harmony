import { ServiceRequest } from "@harmony/nest-microservice";
import {
  NOTIFICATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FormatZodResponse,
  MessageParamsType,
  MessageType,
  MessageCreateType,
  IdSchema,
  IdType,
  UserContextType,
  MessageCreateSchema,
  MessageUpdateType,
} from "@harmony/zod";
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel("Message") private readonly messageModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.NOTIFICATION, "name"))
    private readonly clientNotification: ClientProxy
  ) {}

  async newMessage(
    payload: { message: MessageCreateType },
    user: UserContextType
  ): Promise<MessageType> {
    const parse = MessageCreateSchema.safeParse(payload.message);
    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    try {
      const message = await this.messageModel(payload.message);
      await message.save();

      await this.serviceRequest.send({
        client: this.clientNotification,
        pattern: NOTIFICATION_MESSAGE_PATTERN.NEW_MESSAGE,
        data: {
          message,
        },
        promise: true
      });

      return message;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error creating message")
      );
    }
  }

  async updateMessage(
    payload: {
      content: MessageUpdateType;
      id: IdType;
    },
    user: UserContextType
  ): Promise<MessageUpdateType> {
    try {
      const existingMessage = await this.messageModel.findOne({
        _id: payload.id,
      });

      if (!existingMessage) {
        throw new RpcException(new NotFoundException("Message not found"));
      }

      // Vérifier si l'utilisateur est l'auteur du message
      if (existingMessage.author !== user.id) {
        throw new RpcException(
          new ForbiddenException("You are not allowed to update this message")
        );
      }

      // Mettre à jour le contenu du message uniquement
      existingMessage.content = payload.content.content;
      const updatedMessage = await existingMessage.save();

      return updatedMessage;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error updating message")
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
      const message = await this.findMessage(
        {
          id: payload.id,
        },
        user
      );

      console.log("______________");
      console.log(message);
      console.log("______________");

      if (!message) {
        throw new RpcException(
          new NotFoundException("message request not found.")
        );
      }

      if (message.author !== user.id) {
        throw new RpcException(
          new UnauthorizedException(
            "You are not authorized to delete this message request."
          )
        );
      }

      await this.messageModel.deleteOne({
        _id: payload.id,
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error deleting message.")
      );
    }
  }

  public async findAll(user: UserContextType): Promise<MessageType[]> {
    try {
      const messages = (await this.messageModel
        .find({
          $or: [{ author: user.id }, { recipient: user.id }],
        })
        .exec()) as MessageType[];

      return messages;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async findMessage(
    payload: { id: string },
    user: UserContextType
  ): Promise<MessageType> {
    try {
      const message = await this.messageModel
        .findOne({
          $and: [
            {
              $or: [
                { author: payload.id },
                { recipient: payload.id },
                { _id: payload.id },
              ],
            },
            {
              $or: [{ author: user.id }, { recipient: user.id }],
            },
          ],
        })
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
