import { ServiceRequest } from "@harmony/nest-microservice";
import {
  ACCOUNT_MESSAGE_PATTERN,
  FILE_MESSAGE_PATTERN,
  ROLE_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { RoleType, ServerType, UserPublicType } from "@harmony/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ChannelService } from "../../channel/channel.service";

@Injectable()
export class GlobalServerInterceptor implements NestInterceptor {
  constructor(
    @Inject(getServiceProperty(Services.ACCOUNT, "name"))
    private readonly accountService: ClientProxy,
    @Inject(getServiceProperty(Services.ROLE, "name"))
    private readonly roleService: ClientProxy,
    @Inject(getServiceProperty(Services.FILE, "name"))
    private readonly fileService: ClientProxy,
    private readonly serviceRequest: ServiceRequest,
    private readonly channelService: ChannelService
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(switchMap((value) => from(this.global(value))));
  }

  private async global(server: ServerType) {
    const aggregateObject = {
      channels: [],
      members: [],
      roles: [],
      icon: null,
    };

    if (server.channels) {
      aggregateObject.channels = await this.channelServer(server);
    }
    if (server.members) {
      aggregateObject.members = await this.memberServer(server);
    }
    if (server.roles) {
      aggregateObject.roles = await this.roleServer(server);
    }
    if (server.icon) {
      aggregateObject.icon = await this.iconServer(server);
    }

    // @ts-ignore
    return Object.assign(server.toJSON(), aggregateObject);
  }

  private async channelServer(server: ServerType) {
    return await this.channelService.getAllByIds({ ids: server.channels });
  }

  private async iconServer(server: ServerType) {
    try {
      const icon = await this.serviceRequest.send({
        client: this.fileService,
        pattern: FILE_MESSAGE_PATTERN.FIND_BY_ID,
        data: {
          id: server.icon,
        },
        promise: true,
      });

      return icon.url;
    } catch (error) {
      console.log("Error", error);
      return server.icon;
    }
  }

  private async memberServer(server: ServerType) {
    try {
      const members = await this.serviceRequest.send({
        client: this.accountService,
        pattern: ACCOUNT_MESSAGE_PATTERN.FIND_ALL_BY_IDS,
        data: {
          ids: server.members,
        },
        promise: true,
      });

      return members.map((member: UserPublicType) => {
        delete member.email;
        return member;
      });
    } catch (error) {
      console.log("Error", error);
      return server.members;
    }
  }

  private async roleServer(server: ServerType) {
    try {
      const roles = await this.serviceRequest.send({
        client: this.roleService,
        pattern: ROLE_MESSAGE_PATTERN.INTERNAL_FIND_ROLE_BY,
        data: {
          serverId: server.id,
        },
        promise: true,
      });

      return roles.map(
        (role: RoleType & { createdAt: string; updatedAt: string }) => {
          delete role.server;
          delete role.createdAt;
          delete role.updatedAt;
          return role;
        }
      );
    } catch (error) {
      console.log("Error", error);
      return server.roles;
    }
  }
}
