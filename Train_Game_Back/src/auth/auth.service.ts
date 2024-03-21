import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUser = [
    {
        id: 1,
        username: 'test',
        password: 'test'
    },
    {
        id: 2,
        username: 'test2',
        password: 'test2'
    }

]

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    validateUser({username, password}: AuthPayloadDto) {
        const user = fakeUser.find((user) => user.username === username && user.password === password);
        return user;
    }
    
}
