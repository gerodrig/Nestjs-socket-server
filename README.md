<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

This is a simple setup for a socket.io server in Nest. To start building WebSockets-based applications, first install the required package:

```bash
nest new name-app
cd name-app
nest generate gateway name-app
```

to generate gateway is important to confirm that nest CLI is up to date. This generates a new WebSocket gateway named name-app.gateway.ts” in the “src” directory. Open the generated file and update it as follows

```dotnetcli
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NameAppGateway {
  @WebSocketServer()
  server: Server;
}
```
This code defines a WebSocket gateway named NameAppGateway with a WebSocket server instance.

## Setup CORS
Main.ts
```dotnetcli
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Add this line
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```

## Setup the public path where index.html will be served

```dotnetcli
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { VideogamesGateway } from './videogames/videogames.gateway';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, VideogamesGateway],
})
export class AppModule {}

```

app.controller.ts
```dotnetcli
 @Get()
  root(@Res() res) {
    res.sendFile(indexPath);
  }
```


## Handling WebSocket Events

```dotnetcli
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class NameAppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // Handle connection event
  }

  handleDisconnect(client: any) {
    // Handle disconnection event
  }
}
```

## Sending and Receiving Messages

```dotnetcli
import { SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class NameAppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // Handle connection event
  }

  handleDisconnect(client: Socket) {
    // Handle disconnection event
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    // Handle received message
    this.server.emit('message', data); // Broadcast the message to all connected clients
  }
}
```

## Integration with the Nest.js Application

```dotnetcli
import { Module } from '@nestjs/common';
import { NameAppGateway } from './nameapp.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [NameAppGateway],
})
export class AppModule {}
```

This code adds the NameAppGateway to the providers array, making it available for injection in other components.

## Testing the Real-time Functionality

check index.html file in Public folder

## Install the following dependencies.
```dotnetcli
yarn add @nestjs/serve-static @nestjs/platform-socket.io dotenv
```

## Start Project
```dotnetcli
yarn start:dev
```