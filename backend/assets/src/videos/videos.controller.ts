import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { User } from '../auth/user.decorator';
import { ClerkUserDTO } from '../auth/dto/clerkuser.dto';
import { FeedVideoDto } from './dto/feed-video.dto';

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Post()
    create(@Body() createVideoDto: CreateVideoDto, @User() user: ClerkUserDTO) {
        return this.videosService.create({
            ...createVideoDto,
            user_id: user.sub,
        });
    }

    @Get()
    findAll() {
        return this.videosService.findAll();
    }

    @Get('my-videos')
    findMyVideos(@User() user: ClerkUserDTO) {
        return this.videosService.findByUserId(user.sub);
    }

    @Get('next-feed-video')
    async getNextFeedVideo(@User() user: ClerkUserDTO): Promise<FeedVideoDto> {
        const video = await this.videosService.getNextVideoForFeed(user.sub);
        if (!video) {
            throw new NotFoundException('No videos available');
        }
        return video;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.videosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
        return this.videosService.update(id, updateVideoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.videosService.remove(id);
    }
}