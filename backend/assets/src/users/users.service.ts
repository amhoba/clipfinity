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

    async create(clerk_hash: string): Promise<User> {
        const user = this.usersRepository.create({ clerk_hash });
        return this.usersRepository.save(user);
    }

    async findByClerkHash(clerk_hash: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { clerk_hash } });
    }

    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findOrCreate(clerk_hash: string): Promise<User> {
        let user = await this.findByClerkHash(clerk_hash);
        if (!user) {
            user = await this.create(clerk_hash);
        }
        return user;
    }
}
