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
  UserContextType,
  IdType,
  IdSchema,
  MessageUpdateType,
  MessageUpdateSchema,
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
export class MessageUpdateService {
  constructor(
    private readonly messageService: MessageService,
    @InjectModel("Message") private readonly messageModel,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.NOTIFICATION, "name"))
    private readonly clientNotification: ClientProxy,
    @Inject(getServiceProperty(Services.SEARCH, "name"))
    private readonly clientSearch: ClientProxy
  ) {}

  async update(
    payload: { message: MessageUpdateType },
    user: UserContextType
  ): Promise<boolean> {
    const parse = MessageUpdateSchema.safeParse(payload.message);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    const message = await this.messageModel.findById(payload.message.id);

    if (
      message.author !== user.id &&
      [Roles.ADMIN, Roles.MODERATOR].includes(user.role) === false
    ) {
      throw new RpcException(
        new UnauthorizedException(
          "You are not authorized to update this message."
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
        new UnauthorizedException("You are not authorized to update a message")
      );
    }

    const updatedMessage = await this.messageModel.findOneAndUpdate(
      { _id: message.id },
      { content: payload.message.content }
    );

    await this.sendToSearch(updatedMessage);
    await this.emitNotification(updatedMessage);

    try {
      return updatedMessage;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error while updating message")
      );
    }
  }

  async sendToSearch(message: MessageUpdateType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientSearch,
        pattern: SEARCH_MESSAGE_PATTERN.UPDATE,
        data: {
          id: message.id,
          content: message.content,
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "Error updating message from search index"
        )
      );
    }
  }

  async emitNotification(message: MessageType): Promise<void> {
    try {
      await this.serviceRequest.send({
        client: this.clientNotification,
        pattern: NOTIFICATION_MESSAGE_PATTERN.UPDATE_MESSAGE,
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
