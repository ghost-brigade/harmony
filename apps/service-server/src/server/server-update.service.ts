import { ServerAuthorizationService } from "./server-authorization.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  FormatZodResponse,
  IdType,
  ServerType,
  ServerUpdateSchema,
  ServerUpdateType,
  UserContextType,
} from "@harmony/zod";
import { InjectModel } from "@nestjs/mongoose";
import { ServerService } from "./server.service";
import { Errors } from "@harmony/enums";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ServerUpdateService {
  constructor(
    @InjectModel("Server") private readonly serverModel,
    private readonly serverService: ServerService,
    private readonly serverAuthorizationService: ServerAuthorizationService
  ) {}

  async update(
    payload: {
      serverId: IdType;
      server: ServerUpdateType;
    },
    user: UserContextType
  ): Promise<ServerType> {
    const server = await this.serverService.findOne(payload.serverId);

    if (!server) {
      throw new RpcException(
        new NotFoundException(Errors.ERROR_SERVER_NOT_FOUND)
      );
    }

    const parsed = ServerUpdateSchema.safeParse(payload.server);

    if (parsed.success === false) {
      console.log(parsed.error.issues);
      throw new RpcException(
        new UnprocessableEntityException(FormatZodResponse(parsed.error.issues))
      );
    }

    const canUpdate = await this.serverAuthorizationService.canUpdateServer({
      serverId: payload.serverId,
      user,
    });

    if (canUpdate === false) {
      throw new RpcException(
        new UnauthorizedException(Errors.ERROR_USER_NOT_SERVER_OWNER)
      );
    }

    try {
      const updatedServer = await this.serverModel
        .findByIdAndUpdate({ _id: payload.serverId }, payload.server, {
          new: true,
        })
        .exec();
      return updatedServer;
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error updating server")
      );
    }
  }
}
