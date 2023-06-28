import { ServiceRequest } from "@harmony/nest-microservice";
import { Server } from "@harmony/nest-schemas";
import {
  ACCOUNT_MESSAGE_PATTERN,
  CHANNEL_MESSAGE_PATTERN,
  Services,
  getServiceProperty,
} from "@harmony/service-config";
import { ServerType } from "@harmony/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { from } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { ChannelService } from "../../channel/channel.service";

@Injectable()
export class ChannelInterceptor implements NestInterceptor {
  constructor(private readonly channelService: ChannelService) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(switchMap((value) => from(this.channel(value))));
  }

  private async channel(server: ServerType) {
    const channels = await this.channelServer(server);

    console.log(typeof server);

    // @ts-ignore
    const data = server.toJSON();

    return {
      ...data,
      channels: channels,
    };
  }

  private async channelServer(server: ServerType) {
    return await this.channelService.getAllByIds({ ids: server.channels });
  }
}
