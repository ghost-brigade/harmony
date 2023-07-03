import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  FormatZodResponse,
  IdType,
  ServerCreateSchema,
  ServerCreateType,
  ServerType,
  UserContextType,
  UserType,
} from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { firstValueFrom } from "rxjs";
import { Errors, Permissions } from "@harmony/enums";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";
import { ServerAuthorizationService } from "./server-authorization.service";
import { ServiceRequest } from "@harmony/nest-microservice";

@Injectable()
export class ServerService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    private readonly serverAuthorizationService: ServerAuthorizationService,
    private readonly serviceRequest: ServiceRequest,
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly roleService: ClientProxy
  ) {}

  async findAll(user): Promise<ServerType[]> {
    return await this.serverModel
      .find({
        $or: [{ members: user.id }, { owner: user.id }],
      })
      .exec();
  }

  async findOne(id: string): Promise<ServerType> {
    return await this.serverModel.findOne({ _id: id }).exec();
  }

  async findOneBy(params: ServerType): Promise<ServerType | null> {
    try {
      return await this.serverModel.findOne(params).exec();
    } catch (error) {
      return null;
    }
  }

  async addMember(payload: { serverId: IdType }, memberId: string) {
    const server = await this.findOne(payload.serverId);
    if (!server) {
      throw new NotFoundException(
        `Server with ID ${payload.serverId} not found`
      );
    }

    if (server.owner === memberId) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_USER_IS_OWNER_IN_SERVER)
      );
    }

    if (server.banned.includes(memberId)) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_USER_IS_BANNED_IN_SERVER)
      );
    }

    const user: UserType = await firstValueFrom(
      this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
        id: memberId,
      })
    );
    if (!user) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_FOUND)
      );
    }

    const isUserAlreadyMember = server.members.includes(memberId);
    if (isUserAlreadyMember) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_USER_ALREADY_IN_SERVER)
      );
    }

    const roleDefaultId = await this.serviceRequest.send({
      client: this.roleService,
      pattern: ROLE_MESSAGE_PATTERN.FIND_ALL,
      data: {
        params: {
          server: payload.serverId,
          name: "@default",
        },
      },
      promise: true,
    });

    if (roleDefaultId.length === 0) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_DEFAULT_ROLE_NOT_FOUND)
      );
    }

    try {
      await this.serviceRequest.send({
        client: this.roleService,
        pattern: ROLE_MESSAGE_PATTERN.ADD_USER,
        data: {
          id: roleDefaultId[0].id,
          userId: user.id,
          authorization: false,
        },
        promise: true,
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException(Errors.ERROR_INTERNAL_SERVER_ERROR)
      );
    }

    try {
      const updatedServer = await this.serverModel
        .findByIdAndUpdate(
          payload.serverId,
          { $addToSet: { members: memberId } },
          { new: true }
        )
        .exec();
      return updatedServer;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(Errors.ERROR_INTERNAL_SERVER_ERROR)
      );
    }
  }

  async leaveServer(payload: { serverId: IdType }, userId) {
    const server = await this.findOne(payload.serverId);
    if (!server) {
      throw new NotFoundException(
        `Server with ID ${payload.serverId} not found`
      );
    }

    const isUserAlreadyMember = server.members.includes(userId);
    if (!isUserAlreadyMember) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_IN_SERVER)
      );
    }

    // delete roles attached to this user
    try {
      await this.serviceRequest.send({
        client: this.roleService,
        pattern: ROLE_MESSAGE_PATTERN.INTERNAL_REMOVE_ROLES_OF_USER,
        data: {
          userId: userId,
          serverId: payload.serverId,
        },
        promise: true,
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException(Errors.ERROR_INTERNAL_SERVER_ERROR)
      );
    }
    try {
      const updatedServer = await this.serverModel
        .findByIdAndUpdate(
          payload.serverId,
          { $pull: { members: userId } },
          { new: true }
        )
        .exec();
        return true;
    } catch (error) {
      console.log(error);
      throw new RpcException(
        new InternalServerErrorException(Errors.ERROR_INTERNAL_SERVER_ERROR)
      );
    }
  }

  async removeMember(serverId: string, memberId: string) {
    const server = await this.findOne(serverId);
    if (!server) {
      throw new NotFoundException(`Server with ID ${serverId} not found`);
    }

    const user: UserType = await firstValueFrom(
      this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
        id: memberId,
      })
    );
    if (!user) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_FOUND)
      );
    }

    const isUserAlreadyMember = server.members.includes(memberId);
    if (!isUserAlreadyMember) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_IN_SERVER)
      );
    }

    const updatedServer = await this.serverModel
      .findByIdAndUpdate(
        serverId,
        { $pull: { members: memberId } },
        { new: true }
      )
      .exec();

    return updatedServer;
  }

  async getMembersOfServer(serverId: string): Promise<UserType[]> {
    const server = await this.findOne(serverId);
    if (!server) {
      throw new RpcException(
        new NotFoundException(`Server with ID ${serverId} not found`)
      );
    }

    const memberIds = server.members;

    const members = await firstValueFrom(
      this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS, {
        ids: memberIds,
      })
    );

    return members.filter((member) => member !== null) as UserType[];
  }

  async getServersOfMember(memberId: string): Promise<ServerType[]> {
    const user: UserType = await firstValueFrom(
      this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
        id: memberId,
      })
    );

    if (!user) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_FOUND)
      );
    }

    const servers = await this.serverModel.find({ members: memberId }).exec();

    return servers;
  }

  async banMember(payload: { serverId: IdType; memberId: IdType }, user) {
    const canBan = await this.serverAuthorizationService.canBanUser({
      serverId: payload.serverId,
      user,
    });

    if (canBan === false) {
      throw new RpcException(
        new BadRequestException("You do not have permission to ban this user")
      );
    }

    const server = await this.findOne(payload.serverId);

    if (!server) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
      );
    }

    const isUserAlreadyBanned = server.banned.includes(payload.memberId);

    if (isUserAlreadyBanned) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_USER_ALREADY_BANNED_IN_SERVER)
      );
    }

    const updatedServer = await this.serverModel
      .findByIdAndUpdate(
        payload.serverId,
        { $addToSet: { banned: payload.memberId } },
        { new: true }
      )
      .exec();

    return updatedServer;
  }

  async unbanMember(payload: { serverId: IdType; memberId: IdType }, user) {
    const canBan = await this.serverAuthorizationService.canBanUser({
      serverId: payload.serverId,
      user,
    });

    if (canBan === false) {
      throw new RpcException(
        new BadRequestException("You do not have permission to unban this user")
      );
    }

    const server = await this.findOne(payload.serverId);

    if (!server) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
      );
    }

    const isUserAlreadyBanned = server.banned.includes(payload.memberId);

    if (!isUserAlreadyBanned) {
      throw new RpcException(
        new BadRequestException(Errors.ERROR_USER_NOT_BANNED_IN_SERVER)
      );
    }

    const updatedServer = await this.serverModel

      .findByIdAndUpdate(
        payload.serverId,
        { $pull: { banned: payload.memberId } },
        { new: true }
      )
      .exec();

    return updatedServer;
  }

  async search(
    payload: { search: { name: string } },
    user: UserContextType
  ): Promise<any[]> {
    const query = {
      private: false,
    };

    if (Object.keys(payload.search).length === 0) {
      throw new RpcException(
        new UnprocessableEntityException(Errors.ERROR_QUERY_PARAMS_NOT_FOUND)
      );
    }

    if (payload.search.name) {
      query["name"] = { $regex: payload.search.name, $options: "i" };
    }

    const servers = await this.serverModel.find(query).exec();
    return servers;
  }
}
