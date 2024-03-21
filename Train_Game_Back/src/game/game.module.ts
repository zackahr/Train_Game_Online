import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [GameGateway],
})
export class GameModule {}
