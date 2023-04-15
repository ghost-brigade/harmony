import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from "@nestjs/common";
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

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
    ClientsModule.register([
      {
        name: 'AUTHENTICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [
    AuthenticationController
  ],
  providers: [
    AuthenticationService
  ],
})
export class AuthenticationModule {}
