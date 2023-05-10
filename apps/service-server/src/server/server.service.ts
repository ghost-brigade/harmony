import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { createServerType, serverType, userType } from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Services, getServiceProperty } from "@harmony/service-config";
import { firstValueFrom } from "rxjs";
import mongoose, { Types } from "mongoose";
import { nullable } from "zod";

@Injectable()
export class ServerService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy
  ) {}

  async create(createServer: createServerType): Promise<serverType> {
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

  async getServerById(id: string): Promise<serverType> {
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
      const user: userType = await firstValueFrom(
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
