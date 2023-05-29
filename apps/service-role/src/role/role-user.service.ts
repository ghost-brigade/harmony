import { InjectModel } from "@nestjs/mongoose";
import { RoleService } from "./role.service";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  IdType,
  RoleType,
  UserContextType,
  UserPublicType,
} from "@harmony/zod";
import { ClientProxy, Payload, RpcException } from "@nestjs/microservices";
import { ServiceRequest, UserContext } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";

@Injectable()
export class RoleUserService {
  constructor(
    private readonly serviceRequest: ServiceRequest,
    private readonly roleService: RoleService,
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly clientAccount: ClientProxy
  ) {}

  async addUsersToRole(
    @Payload() payload: { id: IdType; userId: IdType },
    @UserContext() user: UserContextType
  ): Promise<RoleType> {
    // Check if user has permission to manage role
    if (
      (await this.roleService.canManageRole({ serverId: payload.id, user })) ===
      false
    ) {
      throw new RpcException(
        new BadRequestException("You don't have permission to update role")
      );
    }

    let userExistList: UserPublicType[] | null = null;

    // Check if user exists
    try {
      userExistList = await this.serviceRequest.send({
        client: this.clientAccount,
        pattern: ACCOUNT_MESSAGE_PATTERN.IS_EXIST,
        data: { ids: [payload.userId] },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(new BadRequestException("Bad userId provided"));
    }

    if (userExistList === null) {
      throw new RpcException(new BadRequestException("Bad userId provided"));
    }

    // Check if role exists
    if ((await this.roleService.findOneBy(payload, user)) === null) {
      throw new RpcException(new BadRequestException("Role doesn't exist"));
    }

    // Check if user is already in role
    if (
      await this.roleService.isUserInRole(
        { id: payload.id, userId: payload.userId },
        user
      )
    ) {
      throw new RpcException(
        new BadRequestException("User is already in role")
      );
    }

    // Add user to role
    try {
      return await this.roleModel.findOneAndUpdate(
        { _id: payload.id },
        { $push: { users: payload.userId } },
        { returnOriginal: false }
      );
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException(
          "An error occured while adding user to role"
        )
      );
    }
  }

  async removeUsersFromRole(
    @Payload() payload: { id: IdType; userId: IdType },
    @UserContext() user: UserContextType
  ) {
    return;
  }
}
