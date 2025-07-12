import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/user.decorator';
import { ClerkUserDTO } from 'src/auth/dto/clerkuser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    async getProfile(@User() user: ClerkUserDTO) {
        return this.usersService.findOrCreate(user.sub);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }
}
