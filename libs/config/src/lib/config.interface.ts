export interface ConfigData {
  env: string;
  port: string;
  cors_origin: string;
  rate_limit_ttl: string;
  rate_limit_max: string;
  api_entrypoint: string;
  mongodb_uri: string;
  jwt_token_secret: string;
  authentication_service: ServiceConfig;
}

export interface ServiceConfig {
  options: ServiceConfigOptions;
  transport: any;
}

export interface ServiceConfigOptions {
  host: string;
  port: number;
}