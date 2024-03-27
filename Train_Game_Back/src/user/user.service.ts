import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

const fakeUser = [
    {
        id: 1,
        username: 'zakariae',
        score: 2,
        win: 2,
        lose: 2,
        userImg: 'https://cdn.vox-cdn.com/thumbor/Kf8TBWwGCKnzuXDyPjDBgGb27cw=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22519775/1318352350.jpg'
    },
    {
        id: 2,
        username: 'aymane',
        score: 3,
        win: 3,
        lose: 1,
        userImg:'https://yt3.googleusercontent.com/V4FqOieQ9y9dnErXPUZNWl1hyLafxIK7F55n5M8LVhPBmEou8kAbNuMlUZx23DoJHvH1sWG56No=s900-c-k-c0x00ffffff-no-rj'
    },    {
        id: 3,
        username: 'houssam',
        score: 6,
        win: 6,
        lose: 2,
        userImg: 'https://uk1.sportal365images.com/process/smp-image-api/livescore.com/23012024/b4a32bbf-2e73-4f49-8a49-1dd5d57b7b75.jpg?operations=fit(707:)&w=707&quality=100'
    },
    {
        id: 4,
        username: 'amine',
        score: 7,
        win: 7,
        lose: 1,
        userImg:'https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2024-01/Trent%20Alexander-Arnold%20Liverpool%20010924.jpg?h=920929c4&itok=fOF1DelG'
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

