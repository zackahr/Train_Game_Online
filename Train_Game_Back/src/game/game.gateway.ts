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
  private currentPlayerId: number = 0;
  private resetPlayers() {
    this.players = [];
  }

  constructor(private authService: AuthService) { }

  async handleConnection(client: Socket) {
    // console.log(`Client connected: ${client}`);
  }

  async handleDisconnect(client: Socket) {
    // Remove the player from the queue if they disconnect
    this.players = this.players.filter(player => player.client.id !== client.id);
  }

  async afterInit(server: Server) {
  }

  // Handle player moves
  @SubscribeMessage('move')
  async handleMove(@ConnectedSocket() socket: Socket, @MessageBody() data: { move: number; endpoint: number }) {
    data.move += 10;
    this.currentPlayerId = this.players[this.currentPlayerIndex].id;
    if (socket.data.userId === this.players[this.currentPlayerIndex].id) {
      this.server.emit('moved', data.move);
    }
    if (data.move === data.endpoint) {
      this.server.emit('win', data.move);
      setTimeout(() => {
        this.resetPlayers();
      }, 3000);
    }
  }

  @SubscribeMessage('moveEdge')
  async handleMoveEdge(@ConnectedSocket() socket: Socket, @MessageBody() edgeTrain: number) {
    if (this.currentPlayerId % 2 === 1) {
      socket.data.userId = 2;
      edgeTrain = + 1200;
      this.server.emit('movedEdge', edgeTrain);
    } else if (this.currentPlayerId % 2 === 0) {
      socket.data.userId = 1;
      edgeTrain = + 1200;
      this.server.emit('movedEdge', edgeTrain);
    }
  }

  @SubscribeMessage('playagain')
  async handlePlayAgain(@ConnectedSocket() socket: Socket, @MessageBody() authToken: { id: number, username: string, password: string }) {
    // console.log(authToken);
    try {
      if (authToken) {
        socket.data.userId = authToken.id;
        this.players.push({ id: authToken.id, client: socket });
        if (this.players.length === 2) {
          this.startGame(this.players[0].id, this.players[1].id);
          // console.log('game started');
        }
      } else {
        socket.disconnect(true);
      }
    } catch (error) {
      socket.disconnect(true);
    }
  }

  @SubscribeMessage('lose')
  async handleLose(@ConnectedSocket() socket: Socket) {
    this.server.emit('losers');
    setTimeout(() => {
      this.resetPlayers();
    }, 3000);
  }
  // Start the game when two players are ready
  private startGame(player1Id: number, player2Id: number) {
    if (player1Id != player2Id) {
      this.players[0].client.emit('startGame', player2Id);
      this.players[1].client.emit('startGame', player1Id);
      this.players[0].client.emit('playernumber', player2Id);
      this.players[1].client.emit('playernumber', player1Id);
    }
  }


}
