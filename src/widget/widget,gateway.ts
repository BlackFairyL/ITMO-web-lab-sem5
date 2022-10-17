import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';


@WebSocketGateway({ namespace: 'chat' })
export class WidgetGateway{
  @WebSocketServer()
  server;

  @SubscribeMessage('hearMessage')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('hearMessage', message);
  }
}