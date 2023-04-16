import { Transport } from "@nestjs/microservices";
import { IGetService, IService } from "./service-config.interface";
import { servicesEnum } from "../services.enum";

const serviceHostPrefix = 'service';
const serviceDefaultPort = 3000;

const services: { [key: string]: IService } = {};

for (const name in servicesEnum) {
  if (Object.prototype.hasOwnProperty.call(servicesEnum, name)) {
    const serviceName = servicesEnum[name];
    const service: IService = {
      name: `${serviceHostPrefix}-${serviceName}`.toUpperCase(),
      transport: Transport.TCP,
      options: {
        host: `${serviceHostPrefix}-${serviceName}`,
        port: serviceDefaultPort,
      },
    };
    services[serviceName] = service;
  }
}

const getServiceName = (name: servicesEnum) => services[name].name;
const getService: IGetService = (name: servicesEnum) => services[name];
const getServicesList = () => Object.keys(services).map((key) => services[key]);

export {
  getServiceName,
  getService,
  getServicesList
}
