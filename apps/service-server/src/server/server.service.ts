import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { createServerType, serverType } from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ServerService {
  constructor(@InjectModel("Server") private readonly serverModel) {}

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
    const server = await this.serverModel.findById(id).exec();

    if (!server) {
      throw new RpcException(
        new UnprocessableEntityException("Server not found")
      );
    }

    return server;
  }
}
