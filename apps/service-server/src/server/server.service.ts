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

@Injectable()
export class ServerService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy
  ) {}

  async create(createServer: ServerCreateType): Promise<ServerType> {
    const result = ServerCreateSchema.safeParse(createServer);

    if (result.success === false) {
      throw new RpcException(
        new UnprocessableEntityException(FormatZodResponse(result.error.issues))
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
    });

    return createdServer.save();
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
