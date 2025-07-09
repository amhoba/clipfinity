import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from '../database/entities/view.entity';

@Injectable()
export class ViewsService {
    constructor(
        @InjectRepository(View)
        private viewsRepository: Repository<View>,
    ) { }

    async create(user_id: string, video_id: string): Promise<View> {
        const view = this.viewsRepository.create({ user_id, video_id });
        return this.viewsRepository.save(view);
    }

    async findByVideoId(video_id: string): Promise<View[]> {
        return this.viewsRepository.find({ where: { video_id } });
    }

    async getViewCount(video_id: string): Promise<number> {
        return this.viewsRepository.count({ where: { video_id } });
    }
}
