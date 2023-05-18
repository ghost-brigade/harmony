import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  FormatZodResponse,
  ServerCreateSchema,
  ServerCreateType,
  ServerType,
  UserType,
} from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Services, getServiceProperty } from "@harmony/service-config";
import { firstValueFrom } from "rxjs";
import { Errors } from "@harmony/enums";
import { ACCOUNT_MESSAGE_PATTERN } from "@harmony/service-config";

@Injectable()
export class ServerService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy
  ) {}

  async create(createServer: ServerCreateType, user): Promise<ServerType> {
    try {
      const loggedUser = await firstValueFrom(
        this.accountService.send(ACCOUNT_MESSAGE_PATTERN.FIND_ONE, {
          email: user.email,
        })
      );
      console.log(user);

      const result = ServerCreateSchema.safeParse(createServer);

      if (result.success === false) {
        throw new RpcException(
          new UnprocessableEntityException(
            FormatZodResponse(result.error.issues)
          )
        );
      }

      const isUnique = (await this.serverModel
        .findOne()
        .or([{ name: createServer.name }])
        .exec()) as ServerType;

      if (isUnique) {
        throw new RpcException(
          new UnprocessableEntityException(
            isUnique.name === createServer.name
              ? Errors.ERROR_SERVER_NAME_ALREADY_EXISTS
              : null
          )
        );
      }

      const createdServer = new this.serverModel({
        ...createServer,
        owner: loggedUser._id,
      });

      return createdServer.save();
    } catch (error) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_NOT_FOUND)
      );
    }
  }

  async findOne(id: string): Promise<ServerType> {
    return await this.serverModel.findById(id).exec();
  }

  async findOneBy(params: ServerType): Promise<ServerType | null> {
    try {
      return await this.serverModel.findOne(params).exec();
    } catch (error) {
      return null;
    }
  }

  async addMember(serverId: string, memberId: string) {
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
    if (isUserAlreadyMember) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_USER_ALREADY_IN_SERVER)
      );
    }

    const updatedServer = await this.serverModel
      .findByIdAndUpdate(
        serverId,
        { $addToSet: { members: memberId } },
        { new: true }
      )
      .exec();

    return updatedServer;
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
}
