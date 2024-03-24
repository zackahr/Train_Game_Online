import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    getUserData(@Param('id') id: string): UserDto {
        const userId = parseInt(id); // Parse the ID string to a number
        return this.userService.getUserData(userId);
    }
    

    // Other API endpoints for managing user data
}
