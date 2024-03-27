import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { User } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUser = [
    {
        id: 1,
        username: 'zakariae',
        password: '123'
    },
    {
        id: 2,
        username: 'aymane',
        password: '123'
    },
    {
        id: 3,
        username: 'houssam',
        password: '123'
    },
    {
        id: 4,
        username: 'amine',
        password: '123'
    }

]

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    validateUser({ username, password }: AuthPayloadDto) {
        const user = fakeUser.find((user) => user.username === username && user.password === password);
        return user;
    }
    findUserById({ id }: User) {
        const user = fakeUser.find((user) => user.id === id);
        return user;
    }
}
