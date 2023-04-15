import { ConfigData } from "./config.interface";
import { Transport } from "@nestjs/microservices";

export const DEFAULT_CONFIG: ConfigData = {
  env: "development",
  port: "3000",
  cors_origin: "*",
  rate_limit_ttl: "60",
  rate_limit_max: "100",
  api_entrypoint: "",
  mongodb_uri: "",
  jwt_token_secret: "default_jwt_secret",
  authentication_service: {
    options: {
      host: "",
      port: 3000,
    },
    transport: Transport.TCP,
  },
};
