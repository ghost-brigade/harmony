type ServiceType = {
  name: string;
  transport: number;
  options: ServiceOptionsType;
};

type ServiceOptionsType = {
  host: string;
  port: number;
};

type ServicesMapType = { [key: string]: ServiceType };

type ServicePropertiesType = {
  name: string;
  transport: number;
  options: {
    host: string;
    port: number;
  };
};

type ServicePropertyType = string | number | ServiceOptionsType;

export {
  ServiceType,
  ServicesMapType,
  ServiceOptionsType,
  ServicePropertiesType,
  ServicePropertyType,
};
