import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Video } from './video.entity';
import { Like } from './like.entity';
import { View } from './view.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    clerk_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Video, video => video.user)
    videos: Video[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @OneToMany(() => View, view => view.user)
    views: View[];
}