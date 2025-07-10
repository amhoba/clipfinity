import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { User } from '../auth/user.decorator';

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Post()
    create(@Body() createVideoDto: CreateVideoDto, @User() user: any) {
        return this.videosService.create({
            ...createVideoDto,
            user_id: user.id,
        });
    }

    @Get()
    findAll() {
        return this.videosService.findAll();
    }

    @Get('my-videos')
    findMyVideos(@User() user: any) {
        return this.videosService.findByUserId(user.id);
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
