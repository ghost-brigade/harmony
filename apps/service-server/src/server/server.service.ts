import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerService {
  createServer() {
    return "This action adds a new server";
  }
}
