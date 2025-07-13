import { Controller, Post, Delete, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { User } from '../auth/user.decorator';
import { ClerkUserDTO } from '../auth/dto/clerkuser.dto';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }

    @Post(':videoId')
    async likeVideo(@Param('videoId') videoId: string, @User() user: ClerkUserDTO) {
        const existingLike = await this.likesService.findOne(user.sub, videoId);
        if (existingLike) {
            return { message: 'Already liked' };
        }
        return this.likesService.create(user.sub, videoId);
    }

    @Delete(':videoId')
    async unlikeVideo(@Param('videoId') videoId: string, @User() user: ClerkUserDTO) {
        await this.likesService.remove(user.sub, videoId);
        return { message: 'Like removed' };
    }
}
