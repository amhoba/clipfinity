import { Controller, Post, Delete, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { User } from '../auth/user.decorator';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }

    @Post(':videoId')
    async likeVideo(@Param('videoId') videoId: string, @User() user: any) {
        const existingLike = await this.likesService.findOne(user.id, videoId);
        if (existingLike) {
            return { message: 'Already liked' };
        }
        return this.likesService.create(user.id, videoId);
    }

    @Delete(':videoId')
    async unlikeVideo(@Param('videoId') videoId: string, @User() user: any) {
        await this.likesService.remove(user.id, videoId);
        return { message: 'Like removed' };
    }
}
