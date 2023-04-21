import { Injectable } from "@nestjs/common";
import { createServerType, serverType } from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ServerService {
  constructor(@InjectModel("Server") private readonly serverModel) {}

  async create(createServer: createServerType): Promise<serverType> {
    const createdServer = new this.serverModel({
      ...createServer,
    });
    return createdServer.save();
  }
}
