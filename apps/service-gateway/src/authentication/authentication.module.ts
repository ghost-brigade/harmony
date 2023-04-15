import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { ConfigService } from "@harmony/config";

@Module({
  imports: [
    /*ClientsModule.register([
      {
        name: "AUTHENTICATION_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "service-authentication",
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "service-authentication-consumer",
          },
        },
      },
    ]),*/
    // ClientsModule.register([
    //   {
    //     name: "AUTHENTICATION_SERVICE",
    //     transport: Transport.TCP,
    //     options: {
    //       host: "service-authentication",
    //       port: 3000,
    //     },
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: "AUTHENTICATION_SERVICE",
        useFactory: (configService: ConfigService) => {
          const authService = configService.get().authentication_service;
          return {
            transport: authService.transport,
            options: authService.options,
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
