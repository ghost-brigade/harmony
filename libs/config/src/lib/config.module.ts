import { Module, DynamicModule, Global } from "@nestjs/common";
import { ConfigService } from "./config.service";

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    const config = new ConfigService().initialize();
    return config;
  },
};

@Global()
@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [configFactory],
      exports: [configFactory],
    };
  }
}
