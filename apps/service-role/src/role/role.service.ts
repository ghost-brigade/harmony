import { Permissions } from "@harmony/enums";
import { ServiceRequest } from "@harmony/nest-microservice";
import {
  AUTHORIZATION_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import {
  IdType,
  RoleType,
  RoleSchema,
  RoleParamsType,
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

@Injectable()
export class RoleService {
  constructor(
    @InjectModel("Role") private readonly roleModel,
    @Inject(getServiceProperty(Services.AUTHORIZATION, "name"))
    private readonly client: ClientProxy,
    private readonly serviceRequest: ServiceRequest
  ) {}

  public async canManageRole({
    serverId,
    user,
  }: {
    serverId: IdType;
    user: UserContextType;
  }) {
    try {
      return await this.serviceRequest.send({
        client: this.client,
        pattern: AUTHORIZATION_MESSAGE_PATTERN.HAS_RIGHTS,
        data: {
          serverId,
          userId: user.id,
          permissions: [Permissions.ROLE_MANAGE],
        },
        promise: true,
      });
    } catch (error) {
      throw new RpcException(
        new InternalServerErrorException("Error checking permissions")
      );
    }
  }

  public async findAll(
    payload: { params: RoleParamsType },
    user: UserContextType
  ): Promise<RoleType[]> {
    try {
      const roles = (await this.roleModel
        .find(payload.params)
        .exec()) as RoleType[];
      return roles;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async findOneBy(
    payload: {
      id: IdType;
    },
    user: UserContextType
  ): Promise<RoleType> {
    try {
      const role = (await this.roleModel
        .findById(payload.id)
        .exec()) as RoleType;

      //TODO remove permission array if user has no admin permission on server
      return role ? RoleSchema.parse(role) : undefined;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async getRoleByNameAndServerId({
    name,
    server,
  }: {
    name: string;
    server: IdType;
  }): Promise<RoleType> {
    try {
      const role = (await this.roleModel
        .findOne({ name, server })
        .exec()) as RoleType;

      return role ? RoleSchema.parse(role) : undefined;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async findRoleBy(
    {
      name,
      serverId,
      permissions,
      usersId,
    }: {
      name?: string;
      serverId?: IdType;
      permissions?: string[];
      usersId?: IdType[];
    },
    user: UserContextType
  ): Promise<RoleType[]> {
    try {
      const query = {};

      if (name) query["name"] = name;
      if (serverId) query["server"] = serverId;
      if (permissions) query["permissions"] = { $in: permissions };
      if (usersId) query["users"] = { $in: [usersId] };

      return await this.roleModel.find(query).exec();
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  /**
   * Check if role name is valid (not starting with @)
   * @param name
   * @returns
   */
  public isRoleNameValid({
    name,
    throwError,
  }: {
    name: string;
    throwError: boolean;
  }): boolean {
    const isValid = !name.startsWith("@");

    if (!isValid && throwError) {
      throw new RpcException(
        new BadRequestException(`Role name cannot start with @`)
      );
    }

    return isValid;
  }

  public async isRoleNameAlreadyExist({
    name,
    server,
    throwError = false,
  }: {
    name: string;
    server: IdType;
    throwError: boolean;
  }): Promise<boolean> {
    try {
      const isRoleExist = await this.getRoleByNameAndServerId({
        name,
        server,
      });

      if (isRoleExist && throwError) {
        throw new RpcException(
          new BadRequestException(
            `Role with name ${name} already exist on this server`
          )
        );
      }

      return isRoleExist ? true : false;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  // TODO: check if user is in server
  public async isUserInServer({
    user,
    server,
    throwError = false,
  }: {
    user: IdType;
    server: IdType;
    throwError: boolean;
  }): Promise<boolean> {
    const isUserInServer = true;

    if (throwError && !isUserInServer) {
      throw new RpcException(
        new BadRequestException(`User is not in this server`)
      );
    }

    return true;
  }
}
