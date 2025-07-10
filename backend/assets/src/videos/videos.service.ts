import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../database/entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(Video)
        private videosRepository: Repository<Video>,
    ) { }

    async create(createVideoDto: CreateVideoDto): Promise<Video> {
        const video = this.videosRepository.create(createVideoDto);
        return this.videosRepository.save(video);
    }

    async findAll(): Promise<Video[]> {
        return this.videosRepository.find({
            relations: ['user', 'likes', 'views'],
        });
    }

    async findOne(id: string): Promise<Video | null> {
        return this.videosRepository.findOne({
            where: { id },
            relations: ['user', 'likes', 'views'],
        });
    }

    async findByUserId(user_id: string): Promise<Video[]> {
        return this.videosRepository.find({
            where: { user_id },
            relations: ['user', 'likes', 'views'],
        });
    }

    async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
        await this.videosRepository.update(id, updateVideoDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.videosRepository.softDelete({ id });
    }
}
