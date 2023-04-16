type IService = {
  name: string;
  transport: number;
  options: {
    host: string;
    port?: number;
  };
};

type IGetService = (name: string) => IService;

export { IService, IGetService };
