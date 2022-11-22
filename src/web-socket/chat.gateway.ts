import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Users } from 'src/users/users.entity';
import DataStore from 'data-store';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { database } from 'faker';

let clientSocketIds = [];
let connectedUsers = [];

const getSocketByUserId = (userId) => {
  let socket = '';

  for (let i = 0; i < clientSocketIds.length; i++) {
    if (clientSocketIds[i].userId == userId) {
      socket = clientSocketIds[i].socket;
      break;
    }
  }
  return socket;
};

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  nicknames: Map<string, string> = new Map();

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('UpdateStatusToOnline')
  async onlineStatus(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    this.nicknames[socket.id] = data.senderId;
    const senderExist = await this.userRepo.find({
      where: { id: data.senderId },
    });
    const receiverExist = await this.userRepo.find({
      where: { id: data.recieverId },
    });

    if (!senderExist.length || !receiverExist.length) {
      this.server.emit('error', { data: 'user is not exist' });
    }
    this.userRepo.update(data.senderId, { is_online: 1 });

    const responseData = {
      isOnline: 1,
      senderId: Number(data.senderId),
    };

    clientSocketIds.push({ socket: socket.id, userId: data.senderId });
    connectedUsers = connectedUsers.filter(
      (item) => item.userId != data.senderId,
    );
    connectedUsers.push({ userId: data.senderId, socketId: socket.id });
    // this.server.emit('updateUserList', connectedUsers)
    // console.log('......', clientSocketIds, '00000', connectedUsers);

    this.server.emit('onlineStatus', responseData);
  }

  // socket.on('create', function(data) {
  //   console.log("create room")
  //   socket.join(data.room);
  //   let withSocket = getSocketByUserId(data.withUserId);
  //   socket.broadcast.to(withSocket.id).emit("invite", { room: data })
  // });

  @SubscribeMessage('create')
  createRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    socket.join(data.room);

    let withSocket = getSocketByUserId(data.recieverId);
    console.log('socket.id', withSocket);

    console.log('data', data);

    socket.to(withSocket).emit('invite', { room: data });
  }
  //   socket.on('joinRoom', function(data) {
  //     socket.join(data.room.room);
  // });

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    // console.log('room', data);
    socket.join(data.room.room);
  }

  @SubscribeMessage('sendMessage')
  listenForMessages(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log(data);

    // socket.join(data.room)

    socket.to(data.room).emit('newMessage', data);
    // let withSocket = getSocketByUserId(data.senderId);
    // console.log(withSocket);

    // socket.broadcast.to(withSocket).emit("newMessage", data)
    // this.server.emit('newMessage', data);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.nicknames.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    // console.log(this.nicknames);
  }

  // @SubscribeMessage('UpdateStatusToOnline')
  // async onlineStatus(@MessageBody() data, @ConnectedSocket() socket: Socket) {
  //   this.nicknames[socket.id] = data.senderId;
  //   const senderExist = await this.userRepo.find({
  //     where: { id: data.senderId },
  //   });
  //   const receiverExist = await this.userRepo.find({
  //     where: { id: data.recieverId },
  //   });

  //   if (!senderExist.length || !receiverExist.length) {
  //     this.server.emit('error', { data: 'user is not exist' });
  //   }
  //   this.userRepo.update(data.senderId, { is_online: 1 });

  //   const responseData = {
  //     isOnline: 1,
  //     senderId: Number(data.senderId),
  //   };
  //   this.server.emit('onlineStatus', responseData);
  // }

  // @SubscribeMessage('sendMessage')
  // listenForMessages(@MessageBody() data, @ConnectedSocket() client: Socket) {
  //   this.server.emit('newMessage', data);
  // }

  // afterInit(server: Server) {
  //   this.logger.log('Init');
  // }

  // handleDisconnect(client: Socket) {
  //   this.nicknames.delete(client.id);
  //   this.logger.log(`Client disconnected: ${client.id}`);
  // }

  // handleConnection(client: Socket, ...args: any[]) {

  //   this.logger.log(`Client connected: ${client.id}`);

  //   console.log(this.nicknames);
  // }

  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {
    // const clientStore = new DataStore({
    //   path: 'store/client_dev.json',
    // });
    // const clients = clientStore.get('clients', {});
  }
}
