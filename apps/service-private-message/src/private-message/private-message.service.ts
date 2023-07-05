import { Errors, Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
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
  MessageCreateType,
  PrivateMessageCreateType,
  PrivateMessageCreateSchema,
  FormatZodResponse,
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
    private readonly serviceRequest: ServiceRequest
  ) {}

  public async findAll(user: UserContextType): Promise<any> {
    return "test";
  }

  public async create(
    payload: { message: PrivateMessageCreateType; attachments: Multer[] },
    user: UserContextType
  ) {
    console.log(payload.message);
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

    const newMessage = await this.privateMessageModel.create({
      content: payload.message.content,
      receiver: payload.message.receiver,
      author: user.id,
    });

    return newMessage;
  }
}