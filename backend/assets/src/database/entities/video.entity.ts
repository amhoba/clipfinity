import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';
import { View } from './view.entity';

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    object_id: string;

    @Column()
    user_id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date; // Add for soft delete

    @ManyToOne(() => User, user => user.videos)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Like, like => like.video)
    likes: Like[];

    @OneToMany(() => View, view => view.video)
    views: View[];
}