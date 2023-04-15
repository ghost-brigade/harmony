import { Injectable } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { ConfigData } from "./config.interface";
import { DEFAULT_CONFIG } from "./config.default";

@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  initialize(): ConfigService {
    this.loadFromEnv();
    return this;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT || DEFAULT_CONFIG.port,
      cors_origin: env.CORS_ORIGIN || DEFAULT_CONFIG.cors_origin,
      rate_limit_ttl: env.RATE_LIMIT_TTL || DEFAULT_CONFIG.rate_limit_ttl,
      rate_limit_max: env.RATE_LIMIT_MAX || DEFAULT_CONFIG.rate_limit_max,
      api_entrypoint: env.API_ENTRYPOINT || DEFAULT_CONFIG.api_entrypoint,
      mongodb_uri: env.MONGODB_URI || DEFAULT_CONFIG.mongodb_uri,
      jwt_token_secret: env.JWT_TOKEN_SECRET || DEFAULT_CONFIG.jwt_token_secret,

      authentication_service: {
        options: {
          host:
            env.AUTH_SERVICE_HOST ||
            DEFAULT_CONFIG.authentication_service.options.host,
          port:
            Number(env.AUTH_SERVICE_PORT) ||
            DEFAULT_CONFIG.authentication_service.options.port,
        },
        transport: Transport.TCP,
      },
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
