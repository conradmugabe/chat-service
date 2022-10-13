import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketGateway } from 'src/socket/socket.gateway';

export class ChatsGateway extends SocketGateway implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('User with id ', socket.id, ' connected');
    });
  }

  @SubscribeMessage('sendMessage')
  handleEvent(@MessageBody() data: string): void {
    console.log(data);
    const newData = { message: data };
    console.log(newData);
    this.server.emit('receiveMessage', newData);
  }
}
