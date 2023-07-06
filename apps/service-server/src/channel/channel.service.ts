import {
  ChannelCreateSchema,
  ChannelCreateType,
  ChannelType,
  ChannelUpdateType,
  FormatZodResponse,
  IdSchema,
  IdType,
  UserContextType,
} from "@harmony/zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { ChannelAuthorizationService } from "./channel-authorization.service";
import { ChannelType as ChannelTypeEnum } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  MESSENGER_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel("Channel") private readonly channelModel,
    private readonly channelAuthorizationService: ChannelAuthorizationService,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.MESSAGE, "name"))
    private readonly messageClient: ClientProxy
  ) {}

  async getAllByServerId(
    payload: { serverId: IdType },
    user: UserContextType,
    authorization: boolean = true
  ) {
    if (payload.serverId === undefined) {
      throw new RpcException(
        new BadRequestException(
          "You must provide a serverId to fetch channels."
        )
      );
    }

    const parsed = IdSchema.safeParse(payload.serverId);

    if (parsed.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parsed.error.issues))
      );
    }

    if (authorization) {
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
    }

    try {
      const channels = await this.channelModel
        .find({
          server: payload.serverId,
        })
        .select({
          _id: 1,
          name: 1,
          type: 1,
          order: 1,
        })
        .sort({ field: "asc" })
        .exec();

      return channels;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while fetching channels."
        )
      );
    }
  }

  async getById(
    payload: { id: IdType },
    user: UserContextType,
    authorization: boolean
  ) {
    if (payload.id === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel id.")
      );
    }

    const parsed = IdSchema.safeParse(payload.id);

    if (parsed.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parsed.error.issues))
      );
    }

    const channel = (await this.channelModel
      .findById({
        _id: payload.id,
      })
      .exec()) as ChannelType;

    if (channel === null) {
      throw new RpcException(new BadRequestException("Channel not found."));
    }

    if (authorization) {
      const canView = await this.channelAuthorizationService.canViewChannel({
        serverId: channel.server,
        user,
      });

      if (canView === false) {
        throw new RpcException(
          new BadRequestException(
            "You do not have permission to view channels for this server."
          )
        );
      }
    }

    return channel;
  }

  async create(
    payload: { channel: ChannelCreateType },
    user: UserContextType,
    bypassAuthorization = false
  ): Promise<ChannelType> {
    if (payload.channel === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel to create.")
      );
    }

    if (payload.channel.server === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a server id.")
      );
    } else {
      const parsed = IdSchema.safeParse(payload.channel.server);

      if (parsed.success === false) {
        throw new RpcException(
          new BadRequestException(FormatZodResponse(parsed.error.issues))
        );
      }
    }

    if (payload.channel.type === undefined) {
      payload.channel.type = ChannelTypeEnum.TEXT;
    } else {
      if (
        payload.channel.type !== ChannelTypeEnum.TEXT &&
        payload.channel.type !== ChannelTypeEnum.VOICE
      ) {
        throw new RpcException(
          new BadRequestException("Channel type must be either TEXT or VOICE.")
        );
      }
    }

    this.verifyName({
      name: payload?.channel?.name,
    });

    this.verifyOrder({
      order: payload?.channel?.order,
    });

    if (bypassAuthorization === true) {
      const canManage = await this.channelAuthorizationService.canManageChannel(
        {
          serverId: payload.channel.server,
          user,
        }
      );

      if (canManage === false) {
        throw new RpcException(
          new BadRequestException(
            "You do not have permission to create channels for this server."
          )
        );
      }
    }

    if ((await this.getChannelCount(payload.channel.server)) >= 30) {
      throw new RpcException(
        new BadRequestException(
          "You cannot create more than 30 channels for a server."
        )
      );
    }

    try {
      const channel = await this.channelModel.create(payload.channel);

      await this.updateChannelOrder({
        serverId: channel.server,
        channel,
      });

      return channel;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while creating the channel."
        )
      );
    }
  }

  async update(
    payload: { id: IdType; channel: ChannelUpdateType },
    user: UserContextType
  ) {
    if (payload.id === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel id.")
      );
    }

    if (payload.channel === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel to update.")
      );
    }

    if (payload.channel?.name) {
      this.verifyName({
        name: payload?.channel?.name,
      });
    }

    if (payload.channel?.order) {
      this.verifyOrder({
        order: payload?.channel?.order,
      });
    }

    const channel = (await this.channelModel
      .findById({
        _id: payload.id,
      })
      .select({
        _id: 1,
        server: 1,
        name: 1,
        type: 1,
        order: 1,
      })
      .exec()) as ChannelType;

    if (channel === null) {
      throw new RpcException(new BadRequestException("Channel not found."));
    }

    const canManage = await this.channelAuthorizationService.canManageChannel({
      serverId: channel.server,
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
      const updatedChannel = await this.channelModel
        .findByIdAndUpdate(
          {
            _id: payload.id,
          },
          payload.channel,
          {
            new: true,
          }
        )
        .select({
          _id: 1,
          server: 1,
          name: 1,
          type: 1,
          order: 1,
        })
        .exec();

      await this.updateChannelOrder({
        serverId: channel.server,
        channel: updatedChannel,
      });

      return updatedChannel;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while updating the channel."
        )
      );
    }
  }

  async delete(
    payload: { id: IdType },
    user: UserContextType,
    authorization: boolean
  ) {
    if (payload.id === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel id.")
      );
    }

    const channel = (await this.channelModel
      .findById({
        _id: payload.id,
      })
      .exec()) as ChannelType;

    if (channel === null) {
      throw new RpcException(new BadRequestException("Channel not found."));
    }

    const countChannelText = await this.channelModel.countDocuments({
      server: channel.server,
      type: ChannelTypeEnum.TEXT,
    });

    if (countChannelText <= 1) {
      throw new RpcException(
        new BadRequestException(
          "You cannot delete the last text channel in a server."
        )
      );
    }

    if (authorization) {
      const canManage = await this.channelAuthorizationService.canManageChannel(
        {
          serverId: channel.server,
          user,
        }
      );

      if (canManage === false) {
        throw new RpcException(
          new BadRequestException(
            "You do not have permission to create channels for this server."
          )
        );
      }
    }

    try {
      await this.serviceRequest.send({
        client: this.messageClient,
        pattern: MESSENGER_MESSAGE_PATTERN.DELETE_BY_CHANNEL_ID,
        data: {
          channel: channel.id,
        },
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while deleting the channel."
        )
      );
    }

    try {
      await this.channelModel.deleteOne({
        _id: payload.id,
      });

      await this.updateChannelOrder({
        serverId: channel.server,
        channel,
        direction: "lt",
      });

      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while deleting the channel."
        )
      );
    }
  }

  async deleteByServerId(
    payload: { serverId: IdType },
    user: UserContextType,
    authorization: boolean
  ) {
    if (payload.serverId === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a server id.")
      );
    }

    const channels = (await this.channelModel.find({
      server: payload.serverId,
    })) as ChannelType[];

    if (channels === null) {
      throw new RpcException(new BadRequestException("No channels found."));
    }

    if (authorization) {
      const canManage = await this.channelAuthorizationService.canManageChannel(
        {
          serverId: payload.serverId,
          user,
        }
      );

      if (canManage === false) {
        throw new RpcException(
          new BadRequestException(
            "You do not have permission to delete channels for this server."
          )
        );
      }
    }

    try {
      channels.forEach(async (channel: ChannelType) => {
        await this.serviceRequest.send({
          client: this.messageClient,
          pattern: MESSENGER_MESSAGE_PATTERN.DELETE_BY_CHANNEL_ID,
          data: {
            channel: channel.id,
          },
        });
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while deleting the channel."
        )
      );
    }

    try {
      await this.channelModel.deleteMany({
        server: payload.serverId,
      });

      return true;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while deleting the channel."
        )
      );
    }
  }

  private async updateChannelOrder({
    serverId,
    channel,
    direction = "gt",
  }: {
    serverId: IdType;
    channel: ChannelType;
    direction?: "gt" | "lt";
  }): Promise<void> {
    try {
      await this.channelModel.updateMany(
        {
          _id: { $ne: channel.id },
          server: { $eq: serverId },
          order: { $gte: channel.order },
        },
        { $inc: { order: direction === "gt" ? 1 : -1 } }
      );
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while updating channel order."
        )
      );
    }
  }

  private async getChannelCount(serverId: IdType): Promise<number> {
    try {
      const count = await this.channelModel.countDocuments({
        server: serverId,
      });

      return count;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occurred while fetching channel count."
        )
      );
    }
  }

  async getAllByIds(payload: { ids: IdType[] }): Promise<ChannelType[]> {
    const user = await this.channelModel
      .find(
        { _id: { $in: payload.ids } },
        { id: 1, name: 1, type: 1, order: 1 }
      )
      .exec();
    return user;
  }

  private verifyOrder({ order }: { order: number }): void {
    if (order === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel order.")
      );
    }
    if (order < 0) {
      throw new RpcException(
        new BadRequestException("Channel order cannot be less than 1.")
      );
    }
    if (order > 30) {
      throw new RpcException(
        new BadRequestException("Channel order cannot be greater than 30.")
      );
    }
  }

  private verifyName({ name }: { name: string }): void {
    if (name === undefined) {
      throw new RpcException(
        new BadRequestException("You must provide a channel name.")
      );
    }
    if (name.length > 100) {
      throw new RpcException(
        new BadRequestException(
          "Channel name cannot be longer than 100 characters."
        )
      );
    }
    if (name.length < 1) {
      throw new RpcException(
        new BadRequestException("Channel name cannot be empty.")
      );
    }
  }
}
