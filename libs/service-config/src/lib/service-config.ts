import { Transport } from "@nestjs/microservices";
import { Services } from "../services.enum";
import {
  ServiceType,
  ServicesMapType,
  ServicePropertiesType,
  ServicePropertyType,
} from "./service-config.type";

const SERVICE_PREFIX = "service";
const SERVICE_DEFAULT_PORT = 3000;

const initializeServices = (): ServicesMapType =>
  Object.values(Services).reduce((services, serviceName) => {
    const service: ServiceType = {
      name: `${SERVICE_PREFIX}-${serviceName}`.toUpperCase(),
      transport: Transport.TCP,
      options: {
        host: `${SERVICE_PREFIX}-${serviceName}`,
        port: SERVICE_DEFAULT_PORT,
      },
    };
    return { ...services, [serviceName]: service };
  }, {});

const getServices = (): Readonly<ServicesMapType> => initializeServices();

const getService = (name: Services): Readonly<ServiceType> => {
  const services = getServices();
  if (name in services) {
    return services[name];
  }
  throw new Error(`Service ${name} not found`);
};

const getServiceProperty = (
  name: Services,
  property: keyof ServicePropertiesType
): Readonly<ServicePropertyType> => {
  const service = getService(name);
  if (property in service) {
    return service[property];
  }
  throw new Error(`Service ${name} does not have property ${property}`);
};

export { getService, getServices, getServiceProperty };
