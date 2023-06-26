import {
  ChannelCreateSchema,
  ChannelCreateType,
  ChannelUpdateType,
  FormatZodResponse,
  IdSchema,
  IdType,
  UserContextType,
} from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { ChannelAuthorizationService } from "./channel-authorization.service";

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel("Channel") private readonly channelModel,
    private readonly channelAuthorizationService: ChannelAuthorizationService
  ) {}

  async getAllByServerId(payload: { serverId: IdType }, user: UserContextType) {
    const parsed = IdSchema.safeParse(payload.serverId);

    if (parsed.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parsed.error.issues))
      );
    }

    const canView = await this.channelAuthorizationService.canViewChannel({
      serverId: payload.serverId,
      user,
    });

    if (canView === false) {
      throw new RpcException(
        new BadRequestException(
          "You do not have permission to view channels for this server."
        )
      );
    }

    try {
      const channels = await this.channelModel.find({
        serverId: payload.serverId,
      });

      return channels;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while fetching channels."
        )
      );
    }
  }

  async getById(payload: { id: IdType }, user: UserContextType) {
    throw new Error("Method not implemented.");
  }

  async create(payload: ChannelCreateType, user: UserContextType) {
    const parsed = ChannelCreateSchema.safeParse(payload);

    if (parsed.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parsed.error.issues))
      );
    }

    const canManage = await this.channelAuthorizationService.canManageChannel({
      serverId: payload.server,
      user,
    });

    if (canManage === false) {
      throw new RpcException(
        new BadRequestException(
          "You do not have permission to create channels for this server."
        )
      );
    }

    try {
      const channel = await this.channelModel.create(payload);
      return channel;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while creating the channel."
        )
      );
    }
  }

  async update(payload: ChannelUpdateType, user: UserContextType) {
    throw new Error("Method not implemented.");
  }

  async delete(payload: { id: IdType }, user: UserContextType) {
    throw new Error("Method not implemented.");
  }
}
