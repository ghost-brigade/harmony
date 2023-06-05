import { SetMetadata } from "@nestjs/common";
import { GATEWAY_ERROR_HANDLER_DISABLE_KEY } from "../constants/gateway-error-handler.constant";

export const GatewayErrorHandlerDisable = () => SetMetadata(GATEWAY_ERROR_HANDLER_DISABLE_KEY, true);
