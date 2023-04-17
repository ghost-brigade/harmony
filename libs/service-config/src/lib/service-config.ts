import { Transport } from "@nestjs/microservices";
import { Services } from "../services.enum";
import {
  ServiceType,
  ServicePropertiesType,
  ServicePropertyType,
  ServicesMapType,
} from "./service-config.type";

const SERVICE_PREFIX = "service";
const SERVICE_DEFAULT_PORT = 3000;

const services: ServicesMapType = {};

for (const name in Services) {
  if (Object.prototype.hasOwnProperty.call(Services, name)) {
    const serviceName = Services[name];
    const service: ServiceType = {
      name: `${SERVICE_PREFIX}-${serviceName}`.toUpperCase(),
      transport: Transport.TCP,
      options: {
        host: `${SERVICE_PREFIX}-${serviceName}`,
        port: SERVICE_DEFAULT_PORT,
      },
    };
    services[serviceName] = service;
  }
}

const getServices = (): ServicesMapType => {
  return services;
};

const getService = (name: Services): ServiceType => {
  if (name in services) {
    return services[name];
  }
  throw new Error(`Service ${name} not found`);
};

const getServiceProperty = (
  name: Services,
  property: keyof ServicePropertiesType
): ServicePropertyType => {
  const service = getService(name);
  if (property in service) {
    return service[property];
  }
  throw new Error(`Service ${name} does not have property ${property}`);
};

export { getService, getServices, getServiceProperty };
