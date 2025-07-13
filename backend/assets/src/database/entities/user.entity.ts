import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Video } from './video.entity';
import { Like } from './like.entity';
import { View } from './view.entity';

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @OneToMany(() => Video, video => video.user)
    videos: Video[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @OneToMany(() => View, view => view.user)
    views: View[];
}