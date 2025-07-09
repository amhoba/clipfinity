import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkGuard } from '../auth/clerk.guard';
import { User } from '../auth/user.decorator';

@Controller('users')
@UseGuards(ClerkGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    async getProfile(@User() user: any) {
        return this.usersService.findByClerkHash(user.clerk_hash);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }
}
