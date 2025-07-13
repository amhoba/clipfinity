import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(clerkId: string): Promise<User> {
        const user = this.usersRepository.create({
            id: clerkId
        });
        return this.usersRepository.save(user);
    }

    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findOrCreate(clerkId: string): Promise<User> {
        let user = await this.findById(clerkId);
        if (!user) {
            user = await this.create(clerkId);
        }
        return user;
    }

    async softDelete(id: string): Promise<void> {
        await this.usersRepository.softDelete({ id });
    }
}