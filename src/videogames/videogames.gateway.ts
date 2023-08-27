import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, type Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class VideogamesGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('vote')
  handleMessage(
    @MessageBody() data: { name: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Message:', data);
    this.server.emit('vote', 'New message received');
  }
}
