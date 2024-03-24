import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const fakeUser = [
    {
        id: 1,
        username: 'zakariae',
        score: 0,
        win: 0,
        lose: 0
    },
    {
        id: 2,
        username: 'aymane',
        score: 0,
        win: 0,
        lose: 0
    }
];

@Injectable()
export class UserService {
    getUserData(userId: number): UserDto {
        // Find the user with the specified ID
        const user = fakeUser.find((user) => user.id === userId);

        // If the user is not found, throw an error or return null/undefined
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return user;
    }
}

