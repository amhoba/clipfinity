import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../database/entities/like.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
    ) { }

    async create(user_id: string, video_id: string): Promise<Like> {
        const like = this.likesRepository.create({ user_id, video_id });
        return this.likesRepository.save(like);
    }

    async findByVideoId(video_id: string): Promise<Like[]> {
        return this.likesRepository.find({ where: { video_id } });
    }

    async findByUserId(user_id: string): Promise<Like[]> {
        return this.likesRepository.find({ where: { user_id } });
    }

    async findOne(user_id: string, video_id: string): Promise<Like | null> {
        return this.likesRepository.findOne({ where: { user_id, video_id } });
    }

    async remove(user_id: string, video_id: string): Promise<void> {
        await this.likesRepository.delete({ user_id, video_id });
    }
}
