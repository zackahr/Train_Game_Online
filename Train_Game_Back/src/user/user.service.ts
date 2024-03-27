import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const fakeUser = [
    {
        id: 1,
        username: 'zakariae',
        score: 0,
        win: 0,
        lose: 0,
        userImg: 'https://cdn.vox-cdn.com/thumbor/Kf8TBWwGCKnzuXDyPjDBgGb27cw=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22519775/1318352350.jpg'
    },
    {
        id: 2,
        username: 'aymane',
        score: 0,
        win: 0,
        lose: 0,
        userImg:'https://yt3.googleusercontent.com/V4FqOieQ9y9dnErXPUZNWl1hyLafxIK7F55n5M8LVhPBmEou8kAbNuMlUZx23DoJHvH1sWG56No=s900-c-k-c0x00ffffff-no-rj'
    }
];

@Injectable()
export class UserService {
    getUserData(userId: number): UserDto {
        const user = fakeUser.find((user) => user.id === userId);

        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return user;
    }
}

