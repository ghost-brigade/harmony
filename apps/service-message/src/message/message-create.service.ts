import { firstValueFrom } from "rxjs";
import { Errors, Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  FILE_MESSAGE_PATTERN,
  NOTIFICATION_MESSAGE_PATTERN,
  SEARCH_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  FormatZodResponse,
  MessageType,
  MessageCreateType,
  UserContextType,
  MessageCreateSchema,
  IdType,
  UserType,
} from "@harmony/zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { MessageService } from "./message.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";

@Injectable()
export class MessageCreateService {
  constructor(
    private readonly messageService: MessageService,
    @InjectModel("Message") private readonly messageModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.NOTIFICATION, "name"))
    private readonly clientNotification: ClientProxy,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly clientSearch: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly clientFile: ClientProxy,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly clientAccount: ClientProxy
  ) {}

  async create(
    payload: { message: MessageCreateType; attachments: Multer[] },
    user: UserContextType
  ): Promise<MessageType> {
    const parse = MessageCreateSchema.safeParse(payload.message);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
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

    const authorization = await this.messageService.checkPermissions({
      channelId: payload.message.channel,
      user,
      permissions: payload.attachments
        ? [Permissions.MESSAGE_CREATE, Permissions.MESSAGE_FILE_UPLOAD]
        : [Permissions.MESSAGE_CREATE],
    });

    if (!authorization) {
      throw new RpcException(
        new UnauthorizedException("You are not authorized to create a message")
      );
    }

    const newMessage = await this.messageModel.create({
      content: payload.message.content,
      channel: payload.message.channel,
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

    await this.sendToSearch(message);
    await this.emitNotification(message);

    return message;
  }

  async insertMessage(
    message: MessageType & { createdAt: string; updatedAt: string },
    attachments?: IdType[]
  ): Promise<MessageType & { createdAt: string; updatedAt: string }> {
    try {
      const authors = await this.serviceRequest.send({
        client: this.clientAccount,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS,
        data: {
          ids: [message.author],
        },
        promise: true,
      });

      let user;
      const author = authors[0];

      if (authors.length > 0) {
        const avatarUrl = await this.serviceRequest.send({
          client: this.clientFile,
          pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
          data: {
            id: author.avatar,
          },
          promise: true,
        });

        user = {
          id: author.id,
          username: author.username,
          avatar: avatarUrl.url,
        };
      } else {
        user = {
          id: author.id,
          username: author.username,
          avatar: null,
        };
      }

      if (attachments) {
        // push attachments to message
        const updatedMessage = await this.messageModel.findByIdAndUpdate(
          message.id,
          {
            attachment: attachments,
          },
          { new: true }
        );

        const attachmentsUrl = await this.messageService.getAttachments({
          attachment: attachments,
        });

        const messageResponse = {
          id: updatedMessage.id,
          content: updatedMessage.content,
          channel: updatedMessage.channel,
          attachment: attachmentsUrl ?? [],
          author: user,
          createdAt: updatedMessage.createdAt,
          updatedAt: updatedMessage.updatedAt,
        };

        return messageResponse;
      }

      return {
        id: message.id,
        content: message.content,
        channel: message.channel,
        author: user,
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

  async sendToSearch(message: MessageType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientSearch,
        pattern: SEARCH_MESSAGE_PATTERN.CREATE,
        data: {
          id: message.id,
          channelId: message.channel,
          content: message.content,
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "Error sending message to search service"
        )
      );
    }
  }

  async emitNotification(message: MessageType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientNotification,
        pattern: NOTIFICATION_MESSAGE_PATTERN.NEW_MESSAGE,
        data: {
          message,
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error emitting message notification")
      );
    }
  }

  //TODO
  async emitGlobalNotification(message: MessageType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientNotification,
        pattern: NOTIFICATION_MESSAGE_PATTERN.NEW_SERVER_MESSAGE,
        data: {
          message,
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error emitting message notification")
      );
    }
  }
}
