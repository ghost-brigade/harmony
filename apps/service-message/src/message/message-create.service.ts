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
import { MessageService } from "./message.service";

@Injectable()
export class MessageCreateService {
  constructor(
    private readonly messageService: MessageService,
    @InjectModel("Message") private readonly messageModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.NOTIFICATION, "name"))
    private readonly clientNotification: ClientProxy,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly clientSearch: ClientProxy
  ) {}

  async create(
    payload: { message: MessageCreateType },
    user: UserContextType
  ): Promise<MessageType> {
    const parse = MessageCreateSchema.safeParse(payload.message);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const authorization = await this.messageService.checkPermissions({
      channelId: payload.message.channel,
      user,
      permissions: [Permissions.MESSAGE_CREATE],
    });

    if (!authorization) {
      throw new RpcException(
        new UnauthorizedException("You are not authorized to create a message")
      );
    }

    const message = await this.messageModel({
      ...payload.message,
      author: user.id,
    });

    await this.sendToSearch(message);
    await this.emitNotification(message);

    try {
      return await message.save();
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error creating message")
      );
    }
  }

  async sendToSearch(message: MessageType & { _id: any }): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientSearch,
        pattern: SEARCH_MESSAGE_PATTERN.CREATE,
        data: {
          id: message._id.toString(),
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
}
