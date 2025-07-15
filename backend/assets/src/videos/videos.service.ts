import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../database/entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { MinioService } from '../minio/minio.service';
import { Like } from '../database/entities/like.entity';
import { View } from '../database/entities/view.entity';
import { FeedVideoDto } from './dto/feed-video.dto';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(Video)
        private videosRepository: Repository<Video>,
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
        @InjectRepository(View)
        private viewsRepository: Repository<View>,
        private minioService: MinioService,
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

    async update(id: string, updateVideoDto: UpdateVideoDto): Promise<void> {
        await this.videosRepository.update(id, updateVideoDto);
    }

    async remove(id: string): Promise<void> {
        await this.videosRepository.softDelete({ id });
    }

    async getNextVideoForFeed(userId: string): Promise<FeedVideoDto | null> {
        // Get all video IDs
        const videos = await this.videosRepository.find({ select: ['id'] });
        if (videos.length === 0) {
            return null;
        }

        // Randomly select a video
        const randomIndex = Math.floor(Math.random() * videos.length);
        const selectedVideoId = videos[randomIndex].id;

        // Get full video details with relations
        const video = await this.videosRepository.findOne({
            where: { id: selectedVideoId },
            relations: ['user', 'likes', 'views'],
        });

        if (!video) {
            return null;
        }

        // Check if user liked this video
        const liked = await this.likesRepository.findOne({
            where: {
                user_id: userId,
                video_id: video.id,
            },
        });

        // Get signed URL
        let src = await this.minioService.getSignedUrl(video.object_id);
        src = src.replace('http://minio:9000', '/minio');

        return {
            id: video.id, // Include the video ID
            src,
            description: video.description,
            likes: video.likes?.length || 0,
            views: video.views?.length || 0,
            liked: !!liked,
            isSpecialItem: false, // Always false for real videos
        } as FeedVideoDto;
    }
}