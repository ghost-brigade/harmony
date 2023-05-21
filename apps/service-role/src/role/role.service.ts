import {
  IdType,
  RoleType,
  RoleSchema,
  RoleParamsType,
  RolesSchema,
  RolePermissionSchema,
  FormatZodResponse,
  RolesPermissionType,
  UserContextType,
} from "@harmony/zod";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Payload, RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import {} from "@harmony/nest-schemas";
@Injectable()
export class RoleService {
  constructor(@InjectModel("Role") private readonly roleModel) {}

  public async hasRight({
    server,
    user,
    permissions,
  }: {
    server: IdType;
    user: IdType;
    permissions: RolesPermissionType;
  }): Promise<boolean> {
    const parse = RolePermissionSchema.safeParse(permissions);

    if (parse.success === false) {
      throw new RpcException(
        new BadRequestException(FormatZodResponse(parse.error.issues))
      );
    }

    try {
      const hasRight = this.roleModel.findOne({ server, user });

      /*
       * Return true if user has one of the permissions in the array
       */
      return hasRight.some((permission) => permissions.includes(permission));
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error.message));
    }
  }

  public async findAll(
    payload: { params: RoleParamsType },
    user: UserContextType
  ): Promise<RoleType[]> {
    try {
      console.log("params", payload);
      const roles = (await this.roleModel
        .find(payload.params)
        .exec()) as RoleType[];
      return roles ? RolesSchema.parse(roles) : [];
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

  public async isRoleAlreadyExist({
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
