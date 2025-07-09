import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ClerkGuard } from '../auth/clerk.guard';
import { User } from '../auth/user.decorator';

@Controller('views')
@UseGuards(ClerkGuard)
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post(':videoId')
  async recordView(@Param('videoId') videoId: string, @User() user: any) {
    return this.viewsService.create(user.id, videoId);
  }
}
