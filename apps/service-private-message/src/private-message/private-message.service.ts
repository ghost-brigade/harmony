import { Errors, Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  AUTHORIZATION_MESSAGE_PATTERN,
  CHANNEL_MESSAGE_PATTERN,
  FILE_MESSAGE_PATTERN,
  FRIENDREQUEST_MESSAGE_PATTERN,
  FRIEND_MESSAGE_PATTERN,
  NOTIFICATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  MessageType,
  IdType,
  UserContextType,
  UserType,
  FileType,
  MessageCreateType,
  PrivateMessageCreateType,
  PrivateMessageCreateSchema,
  FormatZodResponse,
  PrivateMessageDto,
  PrivateMessageType,
} from "@harmony/zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { Multer } from "multer";

@Injectable()
export class PrivateMessageService {
  constructor(
    @InjectModel("PrivateMessage") private readonly privateMessageModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly clientFile: ClientProxy,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly clientAccount: ClientProxy,
    @Inject(getServiceProperty(Services.NOTIFICATION, "name"))
    private readonly clientNotification: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  public async findAll(user: UserContextType): Promise<any> {
    const query = {
      $or: [{ author: user.id }, { receiver: user.id }],
    };

    const distinctUsers = await this.privateMessageModel.aggregate([
      { $match: query },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$author", user.id] },
              then: "$receiver",
              else: "$author",
            },
          },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $project: {
          userId: "$_id",
          _id: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return distinctUsers.map((user: { userId: string }) => user.userId);
  }

  public async findMessagesWithUser(
    payload: {
      userId: IdType;
      params?: { page?: number; limit?: number };
    },
    user
  ): Promise<any> {
    const query = {
      $or: [
        { $and: [{ author: user.id }, { receiver: payload.userId }] },
        { $and: [{ author: payload.userId }, { receiver: user.id }] },
      ],
    };

    const messages = await this.privateMessageModel
      .find(query)
      .limit(payload.params?.limit ?? 10)
      .skip((payload.params?.page - 1 ?? 0) * (payload.params?.limit ?? 10))
      .sort({ createdAt: -1 })
      .exec();

    const count = await this.privateMessageModel.countDocuments(query);

    return {
      messages,
      count,
      // @ts-ignore
      currentPage: Number.parseInt(payload.params?.page ?? "1"),
      lastPage: Math.ceil(count / (payload.params?.limit ?? 10)),
    };
  }

  async getById(payload: { id: IdType }, user: UserContextType) {
    const privateMessage = await this.privateMessageModel
      .findById(payload.id)
      .exec();

    if (!privateMessage) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_MESSAGE_NOT_FOUND)
      );
    }

    return privateMessage;
  }

  public async create(
    payload: { message: PrivateMessageCreateType; attachments: Multer[] },
    user: UserContextType
  ) {
    const parse = PrivateMessageCreateSchema.safeParse(payload.message);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    if (user.id === payload.message.receiver) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_CANT_SEND_SELF_DM)
      );
    }

    if (!payload.message.content && !payload.attachments) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_NO_CONTENT_OR_ATTACHMENT)
      );
    }

    if (payload.message.content?.length > 500) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_CONTENT_MESSAGE_TOO_LONG)
      );
    }

    const receiver = await this.serviceRequest.send({
      client: this.accountService,
      pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ONE,
      data: {
        id: payload.message.receiver,
      },
      promise: true,
    });

    if (!receiver) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_FOUND)
      );
    }

    // USER IS NOT YOUR FRIEND
    // const isFriend = await this.serviceRequest.send({
    //   client: this.accountService,
    //   pattern: FRIEND_MESSAGE_PATTERN.FIND_ALL,
    //   data: {
    //     id: payload.message.receiver,
    //   },
    //   promise: true,
    // });

    const newMessage = await this.privateMessageModel.create({
      content: payload.message.content,
      receiver: payload.message.receiver,
      author: user.id,
    });

    const attachmentsIds = [];

    try {
      if (payload.attachments) {
        for (const attachment of payload.attachments) {
          const attachmentId = await this.serviceRequest.send({
            client: this.clientFile,
            pattern: FILE_MESSAGE_PATTERN.CREATE,
            data: {
              file: attachment,
              message: newMessage.id,
            },
            promise: true,
          });

          attachmentsIds.push(attachmentId.id);
        }
      }
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Cannot upload message attachments")
      );
    }

    try {
      await newMessage.save();
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Cannot create a message")
      );
    }

    const message = await this.insertMessage(newMessage, attachmentsIds);

    // await this.sendToSearch(message);
    await this.emitNotification(message, "CREATE");

    return message;
  }

  async emitNotification(
    message: PrivateMessageType,
    type: "CREATE" | "UPDATE" | "DELETE"
  ): Promise<void> {
    let data, pattern;

    switch (type) {
      case "CREATE":
        data = { message };
        pattern = NOTIFICATION_MESSAGE_PATTERN.NEW_PRIVATE_MESSAGE;
        break;
      case "UPDATE":
        data = { message };
        pattern = NOTIFICATION_MESSAGE_PATTERN.UPDATE_PRIVATE_MESSAGE;
        break;
      case "DELETE":
        data = {
          messageId: message.id,
          receiverId: message.receiver,
          authorId: message.author,
        };
        pattern = NOTIFICATION_MESSAGE_PATTERN.DELETE_PRIVATE_MESSAGE;
        break;
    }

    try {
      await this.serviceRequest.send({
        client: this.clientNotification,
        pattern,
        data,
        promise: true,
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error emitting message notification")
      );
    }
  }

  async insertMessage(
    message: PrivateMessageType & { createdAt: string; updatedAt: string },
    attachments?: IdType[]
  ): Promise<PrivateMessageType & { createdAt: string; updatedAt: string }> {
    try {
      const authors = await this.serviceRequest.send({
        client: this.clientAccount,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS,
        data: {
          ids: [message.author, message.receiver],
        },
        promise: true,
      });

      let userAuthor;
      let userReceiver;
      const author = authors[0];
      const receiver = authors[1];

      let authorAvatarUrl = null;
      let receiverAvatarUrl = null;

      if (author) {
        try {
          authorAvatarUrl = await this.serviceRequest.send({
            client: this.clientFile,
            pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
            data: {
              id: author.avatar,
            },
            promise: true,
          });

          userAuthor = {
            id: author.id,
            username: author.username,
            avatar: authorAvatarUrl?.url ?? undefined,
          };
        } catch (error) {
          console.log(error);
        }
      } else {
        userAuthor = {
          id: author.id,
          username: author.username,
          avatar: null,
        };
      }

      if (receiver) {
        try {
          receiverAvatarUrl = await this.serviceRequest.send({
            client: this.clientFile,
            pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
            data: {
              id: receiver.avatar,
            },
            promise: true,
          });
        } catch (error) {
          console.log(error);
        }
        userReceiver = {
          id: receiver.id,
          username: receiver.username,
          avatar: receiverAvatarUrl?.url ?? undefined,
        };
      } else {
        userReceiver = {
          id: receiver.id,
          username: receiver.username,
          avatar: null,
        };
      }

      if (attachments) {
        // push attachments to message
        const updatedMessage = await this.privateMessageModel.findByIdAndUpdate(
          message.id,
          {
            attachment: attachments,
          },
          { new: true }
        );

        const attachmentsUrl = await this.getAttachments({
          attachment: attachments,
        });

        const messageResponse = {
          id: updatedMessage.id,
          content: updatedMessage.content,
          receiver: userReceiver,
          attachment: attachmentsUrl ?? [],
          author: userAuthor,
          createdAt: updatedMessage.createdAt,
          updatedAt: updatedMessage.updatedAt,
        };

        return messageResponse;
      }

      return {
        id: message.id,
        content: message.content,
        receiver: userReceiver,
        author: userAuthor,
        attachment: attachments,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      };
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error creating message")
      );
    }
  }

  public async getAttachments(message: { attachment: IdType[] }) {
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

  public async updateMessage(
    messageId: string,
    privateMessage: PrivateMessageDto
  ): Promise<PrivateMessageDto> {
    const updatedMessage = await this.privateMessageModel
      .findByIdAndUpdate(messageId, privateMessage, { new: true })
      .exec();

    if (!updatedMessage) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_MESSAGE_NOT_FOUND)
      );
    }

    await this.emitNotification(updatedMessage, "UPDATE");

    return updatedMessage;
  }

  public async deleteMessage(messageId: string): Promise<boolean> {
    const message = await this.privateMessageModel.findById(messageId).exec();

    if (!message) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_MESSAGE_NOT_FOUND)
      );
    }

    await this.emitNotification(message, "DELETE");

    try {
      await this.privateMessageModel.deleteOne({
        _id: messageId,
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error while deleting private message")
      );
    }
  }
}
