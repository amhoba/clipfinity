import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    video_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.likes)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Video, video => video.likes)
    @JoinColumn({ name: 'video_id' })
    video: Video;
}
