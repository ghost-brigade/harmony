import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  async login() {
    return this.client.send('login', {});
  }
}
