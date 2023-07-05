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
export class PrivateMessageService {
  constructor(
    @InjectModel("PrivateMessage") private readonly privateMessageModel,
    private readonly serviceRequest: ServiceRequest
  ) {}

  public async findAll(user: UserContextType): Promise<any> {
    return "test";
  }
}
