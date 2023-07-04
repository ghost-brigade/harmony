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
import { from, Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { ChannelService } from "../../channel/channel.service";

@Injectable()
export class GlobalAllServerInterceptor implements NestInterceptor {
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

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        switchMap((servers: ServerType[]) =>
          from(Promise.all(servers.map((server) => this.global(server))))
        )
      );
  }

  private async global(server: ServerType) {
    const aggregateObject = {
      icon: null,
    };

    if (server.icon && JSON.stringify(server.icon) !== JSON.stringify({})) {
      aggregateObject.icon = await this.iconServer(server);
    }

    // @ts-ignore
    return Object.assign(server.toJSON(), aggregateObject);
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
}
