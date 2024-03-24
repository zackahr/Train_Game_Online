import { WebSocketGateway, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';

interface Player {
  id: number;
  client: Socket;
}

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private players: Player[] = [];
  private currentPlayerIndex: number = 0;

  constructor(private authService: AuthService) { }

  async handleConnection(client: Socket) {
    // console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
    // Remove the player from the queue if they disconnect
    this.players = this.players.filter(player => player.client.id !== client.id);
  }

  async afterInit(server: Server) {
    // console.log('Socket server initialized');
  }

  // Authenticate the player
  @SubscribeMessage('authenticate')
  async handleAuthenticate(@ConnectedSocket() client: Socket, @MessageBody() authToken: { id: number, username: string, password: string }) {
    try {
      if (authToken) {
        client.data.userId = authToken.id;
        // console.log(`Player ${authToken.id} authenticated with client ID: ${client.id}`);

        this.players.push({ id: authToken.id, client });
        // console.log('Players in queue:', this.players.length);

        if (this.players.length === 2) {
          // Second player to authenticate
          this.startGame(this.players[0].id, this.players[1].id);
          this.players[0].client.emit('playerOrder', { isFirst: false });
          this.players[1].client.emit('playerOrder', { isFirst: true });
        }
      } else {
        // console.log(`Authentication failed for client ID: ${client.id}`);
        client.disconnect(true);
      }
    } catch (error) {
      // console.error('Error during authentication:', error);
      client.disconnect(true);
    }
  }

  // Handle player moves
  @SubscribeMessage('move')
  async handleMove(@ConnectedSocket() socket: Socket,@MessageBody() data: { move: number; endpoint: number }) {
    // console.log('move', data.move + ' from player', socket.data.userId);
    // console.log('endpoint', data.endpoint);
    data.move += 10;
    if (socket.data.userId === this.players[this.currentPlayerIndex].id) {
      this.server.emit('moved', data.move);
    }
    if (data.move === data.endpoint) {
      this.server.emit('win', data.move);
    }
  }

  @SubscribeMessage('moveEdge')
  async handleMoveEdge(@ConnectedSocket() socket: Socket,@MessageBody() edgeTrain: number) {
    // console.log('moveEdge', edgeTrain + ' from player', socket.data.userId);
    if (socket.data.userId === this.players[this.currentPlayerIndex].id + 1) {
      edgeTrain =+ 1200;
      // console.log('new edge', edgeTrain);
      this.server.emit('movedEdge', edgeTrain);
    }
  }

  // Start the game when two players are ready
  private startGame(player1Id: number, player2Id: number) {
    // Emit a start game event to both players
    // console.log('Starting game between players', player1Id, 'and', player2Id);
    if (player1Id != player2Id) {
      this.players[0].client.emit('startGame', player2Id);
      this.players[1].client.emit('startGame', player1Id);
    }
  }


}
