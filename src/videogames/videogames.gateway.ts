import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, type Socket } from 'socket.io';
import { Videogames, Videogame } from './models';

const videogames = new Videogames();

videogames.addVideogame(new Videogame('Super Mario 64'));
videogames.addVideogame(new Videogame('The Legend of Zelda: Ocarina of Time'));
videogames.addVideogame(new Videogame('Super Smash Bros'));
videogames.addVideogame(new Videogame('GoldenEye 007'));
videogames.addVideogame(new Videogame('Perfect Dark'));

@WebSocketGateway({ cors: true })
export class VideogamesGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected');

    client.emit('active-videogames', videogames.getVideogames());
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('vote-videogame')
  handleMessage(
    @MessageBody() data: { id: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('id:', data);
    videogames.voteVideogame(data.id);
    this.server.emit('active-videogames', videogames.getVideogames());
  }

  @SubscribeMessage('emit-message')
  handleNewMessage(
    @MessageBody() data: { name: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Message:', data);
    //this.server.emit('new-message', data); //?emit to all clients
    client.broadcast.emit('new-message', data); //?emit to all clients except sender
  }

  @SubscribeMessage('add-videogame')
  handleAddVideogame(@MessageBody() data: { name: string }) {
    videogames.addVideogame(new Videogame(data.name));
    this.server.emit('active-videogames', videogames.getVideogames());
  }

  @SubscribeMessage('delete-videogame')
  handleDeleteVideogame(@MessageBody() data: { id: string }) {
    videogames.deleteVideogame(data.id);
    this.server.emit('active-videogames', videogames.getVideogames());
  }
}
