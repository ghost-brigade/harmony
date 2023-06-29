import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("test")
  test(@MessageBody() data: any) {
    this.message(data);
  }

  @SubscribeMessage("message")
  message(message) {
    console.log(message);
    this.server.emit("message", message);
  }
}
