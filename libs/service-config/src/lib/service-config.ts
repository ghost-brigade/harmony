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

/**
 * Initializes the services configuration with default values.
 *
 * @returns {ServicesMapType} The initialized services configuration.
 */
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

/**
 * The current services configuration.
 *
 * @type {ServicesMapType}
 */
let services: ServicesMapType = initializeServices();

/**
 * Updates the current services configuration with new values.
 *
 * @param {ServicesMapType} newServices - The new services configuration.
 */
const updateServices = (newServices: ServicesMapType): void => {
  services = { ...newServices };
};

/**
 * Retrieves the current services configuration.
 *
 * @returns {Readonly<ServicesMapType>} The current services configuration.
 */
const getServices = (): Readonly<ServicesMapType> => services;

/**
 * Retrieves a specific service from the current services configuration.
 *
 * @param {Services} name - The name of the service to retrieve.
 * @returns {Readonly<ServiceType>} The specified service.
 * @throws {Error} If the specified service does not exist in the configuration.
 */
const getService = (name: Services): Readonly<ServiceType> => {
  if (name in services) {
    return services[name];
  }
  throw new Error(`Service ${name} not found`);
};

/**
 * Retrieves a specific property of a service from the current services configuration.
 *
 * @param {Services} name - The name of the service to retrieve the property from.
 * @param {keyof ServicePropertiesType} property - The name of the property to retrieve.
 * @returns {Readonly<ServicePropertyType>} The specified property.
 * @throws {Error} If the specified property does not exist in the specified service.
 */
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

export { getService, getServices, getServiceProperty, updateServices };
