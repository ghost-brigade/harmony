import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ServerCreateType, ServerType, UserType } from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Services, getServiceProperty } from "@harmony/service-config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServerService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy
  ) {}

  async create(createServer: ServerCreateType): Promise<ServerType> {
    if (!createServer.name) {
      throw new RpcException(
        new UnprocessableEntityException("Name is required")
      );
    }

    const createdServer = new this.serverModel({
      ...createServer,
    });

    return createdServer.save();
  }

  async getServerById(id: string): Promise<ServerType> {
    try {
      return await this.serverModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  async addMember(serverId: string, memberId: string) {
    const server = await this.getServerById(serverId);

    if (!server) {
      throw new NotFoundException(`Server with ID ${serverId} not found`);
    }

    try {
      const user: UserType = await firstValueFrom(
        this.accountService.send("account_find_one", {
          id: memberId,
        })
      );
    } catch (error) {
      throw new RpcException(new NotFoundException("User not found"));
    }

    const isUserAlreadyMember = server.members.some(
      (member) => member.toString() === memberId
    );

    if (isUserAlreadyMember) {
      throw new RpcException(new NotFoundException("User already in server"));
    }

    const updatedServer = await this.serverModel
      .findByIdAndUpdate(
        serverId,
        { $addToSet: { members: memberId } },
        { new: true, useFindAndModify: false }
      )
      .exec();

    return updatedServer;
  }
}
