import { Controller, Post, Param } from '@nestjs/common';
import { ViewsService } from './views.service';
import { User } from '../auth/user.decorator';
import { ClerkUserDTO } from '../auth/dto/clerkuser.dto';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post(':videoId')
  async recordView(@Param('videoId') videoId: string, @User() user: ClerkUserDTO) {
    return this.viewsService.create(user.sub, videoId);
  }
}
