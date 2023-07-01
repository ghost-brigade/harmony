import { Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  AUTHORIZATION_MESSAGE_PATTERN,
  CHANNEL_MESSAGE_PATTERN,
  NOTIFICATION_MESSAGE_PATTERN,
  SEARCH_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FormatZodResponse,
  MessageType,
  MessageCreateType,
  IdType,
  UserContextType,
  MessageCreateSchema,
  MessageUpdateType,
  UserType,
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
    private readonly clientNotification: ClientProxy,
    @Inject(getServiceProperty(Services.AUTHORIZATION, "name"))
    private readonly clientAuthorization: ClientProxy,
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly clientServer: ClientProxy,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly clientSearch: ClientProxy
  ) {}

  private async getServerFromChannel(channelId: IdType) {
    try {
      const channel = await this.serviceRequest.send({
        client: this.clientServer,
        pattern: CHANNEL_MESSAGE_PATTERN.GET_BY_ID,
        data: {
          id: channelId,
        },
        promise: true,
      });

      return channel;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error occurred while getting server")
      );
    }
  }

  public async checkPermissions({
    serverId,
    channelId,
    user,
    permissions,
  }: {
    serverId?: IdType;
    channelId?: IdType;
    user: UserContextType;
    permissions: Permissions[];
  }): Promise<boolean> {
    let channel = null;

    if (serverId === undefined && channelId) {
      channel = await this.getServerFromChannel(channelId);
    }

    try {
      return await this.serviceRequest.send({
        client: this.clientAuthorization,
        pattern: AUTHORIZATION_MESSAGE_PATTERN.HAS_RIGHTS,
        data: {
          serverId: serverId ?? channel.server,
          userId: user.id,
          permissions,
        },
        promise: true,
      });
    } catch (error) {
      return false;
    }
  }

  public async findById(
    payload: { id: IdType },
    user: UserType,
    authorization?: boolean
  ): Promise<MessageType> {
    const message = await this.messageModel.findById(payload.id);

    if (!message) {
      throw new RpcException(new NotFoundException("Message not found"));
    }

    try {
      if (authorization) {
        const authorization = await this.checkPermissions({
          channelId: message.channel,
          user,
          permissions: [Permissions.CHANNEL_VIEW],
        });

        if (!authorization) {
          throw new RpcException(
            new UnauthorizedException(
              "You are not authorized to view message on this channel"
            )
          );
        }
      }

      return message;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error getting message")
      );
    }
  }

  // async updateMessage(
  //   payload: {
  //     content: MessageUpdateType;
  //     id: IdType;
  //   },
  //   user: UserContextType
  // ): Promise<MessageUpdateType> {
  //   try {
  //     const existingMessage = await this.messageModel.findOne({
  //       _id: payload.id,
  //     });

  //     if (!existingMessage) {
  //       throw new RpcException(new NotFoundException("Message not found"));
  //     }

  //     // Vérifier si l'utilisateur est l'auteur du message
  //     if (existingMessage.author !== user.id) {
  //       throw new RpcException(
  //         new ForbiddenException("You are not allowed to update this message")
  //       );
  //     }

  //     // Mettre à jour le contenu du message uniquement
  //     existingMessage.content = payload.content.content;
  //     const updatedMessage = await existingMessage.save();

  //     return updatedMessage;
  //   } catch (error) {
  //     console.log(error);
  //     throw new RpcException(
  //       new InternalServerErrorException("Error updating message")
  //     );
  //   }
  // }

  // public async findAll(user: UserContextType): Promise<MessageType[]> {
  //   try {
  //     const messages = (await this.messageModel
  //       .find({
  //         $or: [{ author: user.id }, { recipient: user.id }],
  //       })
  //       .exec()) as MessageType[];

  //     return messages;
  //   } catch (error) {
  //     throw new RpcException(new InternalServerErrorException(error.message));
  //   }
  // }

  // public async findMessage(
  //   payload: { id: string },
  //   user: UserContextType
  // ): Promise<MessageType> {
  //   try {
  //     const message = await this.messageModel
  //       .findOne({
  //         $and: [
  //           {
  //             $or: [
  //               { author: payload.id },
  //               { recipient: payload.id },
  //               { _id: payload.id },
  //             ],
  //           },
  //           {
  //             $or: [{ author: user.id }, { recipient: user.id }],
  //           },
  //         ],
  //       })
  //       .exec();

  //     if (!message) {
  //       throw new RpcException(
  //         new BadRequestException("Message does not exist.")
  //       );
  //     }

  //     return message as MessageType;
  //   } catch (error) {
  //     throw new RpcException(new InternalServerErrorException(error.message));
  //   }
  // }
}
