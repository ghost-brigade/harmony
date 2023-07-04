import { Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  AUTHORIZATION_MESSAGE_PATTERN,
  CHANNEL_MESSAGE_PATTERN,
  FILE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  MessageType,
  IdType,
  UserContextType,
  UserType,
  FileType,
} from "@harmony/zod";
import {
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
    @Inject(getServiceProperty(Services.AUTHORIZATION, "name"))
    private readonly clientAuthorization: ClientProxy,
    @Inject(getServiceProperty(Services.SERVER, "name"))
    private readonly clientServer: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly clientFile: ClientProxy
  ) {}

  public async getAttachments(message: MessageType) {
    if (message.attachment) {
      return await Promise.all(
        message.attachment.map(async (attachment) => {
          try {
            const file = (await this.serviceRequest.send({
              client: this.clientFile,
              pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
              data: {
                id: attachment,
              },
              promise: true,
            })) as FileType;

            return file.url;
          } catch (error) {
            return null;
          }
        })
      );
    }

    return [];
  }

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

  public async findByChannelId(
    payload: { channelId: IdType; params?: { page?: number; limit?: number } },
    user: UserType
  ) {
    try {
      const authorization = await this.checkPermissions({
        channelId: payload.channelId,
        user,
        permissions: [Permissions.CHANNEL_VIEW],
      });

      if (!authorization) {
        throw new RpcException(
          new UnauthorizedException(
            "You are not authorized to view messages on this channel"
          )
        );
      }

      const messages = await this.messageModel
        .find({
          channel: payload.channelId,
        })
        .limit(payload.params?.limit ?? 10)
        .skip((payload.params?.page - 1 ?? 0) * (payload.params?.limit ?? 10))
        .sort({ createdAt: -1 })
        .exec();

      const count = await this.messageModel.countDocuments({
        channel: payload.channelId,
      });

      return {
        messages,
        count,
        currentPage: payload.params?.page ?? 1,
        lastPage: Math.ceil(count / (payload.params?.limit ?? 10)),
      };
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error getting messages")
      );
    }
  }

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
