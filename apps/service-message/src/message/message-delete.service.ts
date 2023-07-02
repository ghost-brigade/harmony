import { Permissions, Roles } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
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
  IdSchema,
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

@Injectable()
export class MessageDeleteService {
  constructor(
    private readonly messageService: MessageService,
    @InjectModel("Message") private readonly messageModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.NOTIFICATION, "name"))
    private readonly clientNotification: ClientProxy,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly clientSearch: ClientProxy
  ) {}

  async delete(
    payload: { id: IdType },
    user: UserContextType
  ): Promise<boolean> {
    const parse = IdSchema.safeParse(payload.id);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const message = await this.messageService.findById(payload, user, false);

    if (
      message.author !== user.id ||
      [Roles.ADMIN, Roles.MODERATOR].includes(user.role) === false
    ) {
      throw new RpcException(
        new UnauthorizedException(
          "You are not authorized to delete this message."
        )
      );
    }

    const authorization = await this.messageService.checkPermissions({
      channelId: message.channel,
      user,
      permissions: [Permissions.MESSAGE_CREATE],
    });

    if (!authorization) {
      throw new RpcException(
        new UnauthorizedException("You are not authorized to delete a message")
      );
    }

    await this.sendToSearch(message);
    await this.emitNotification(message);

    try {
      await this.messageModel.deleteOne({
        _id: payload.id,
      });

      return true;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException("Error while deleting message")
      );
    }
  }

  async deleteByChannelId({
    channelId,
  }: {
    channelId: IdType;
  }): Promise<boolean> {
    try {
      await this.messageModel.deleteMany({
        channel: channelId,
      });

      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error while deleting messages")
      );
    }
  }

  async sendToSearch(message: MessageType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientSearch,
        pattern: SEARCH_MESSAGE_PATTERN.DELETE,
        data: {
          id: message.id,
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "Error removing message from search index"
        )
      );
    }
  }

  async emitNotification(message: MessageType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientNotification,
        pattern: NOTIFICATION_MESSAGE_PATTERN.DELETE_MESSAGE,
        data: {
          messageId: message.id,
          channelId: message.channel,
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
