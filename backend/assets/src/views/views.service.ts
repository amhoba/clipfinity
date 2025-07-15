import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull } from 'typeorm';
import { View } from '../database/entities/view.entity';

@Injectable()
export class ViewsService {
    // Hardcoded time restriction: 1 hour (in milliseconds)
    private readonly VIEW_RESTRICTION_TIME = 60 * 60 * 1000; // 1 hour

    constructor(
        @InjectRepository(View)
        private viewsRepository: Repository<View>,
    ) { }

    async create(user_id: string, video_id: string): Promise<View | null> {
        // Check if user has viewed this video within the restriction time
        const restrictionTime = new Date(Date.now() - this.VIEW_RESTRICTION_TIME);

        const existingView = await this.viewsRepository.findOne({
            where: {
                user_id,
                video_id,
                created_at: MoreThan(restrictionTime),
                deleted_at: IsNull(),
            },
        });

        // If a view exists within the restriction time, don't create a new one
        if (existingView) {
            return null;
        }

        // Create new view if no recent view exists
        const view = this.viewsRepository.create({ user_id, video_id });
        return this.viewsRepository.save(view);
    }
}
