import { Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    getUserData(@Param('id') id: string): UserDto {
        const userId = parseInt(id);
        return this.userService.getUserData(userId);
    }

    @Post('win/:id')
    handleWin(@Param('id') id: string): UserDto {
        const userId = parseInt(id);
        return this.userService.updateUserWin(userId);
    }

    @Post('lose/:id')
    handleLose(@Param('id') id: string): UserDto {
        const userId = parseInt(id);
        return this.userService.updateUserLose(userId);
    }
}
