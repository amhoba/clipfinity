import { Controller, Post, Param, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { ViewsService } from './views.service';
import { User } from '../auth/user.decorator';
import { ClerkUserDTO } from '../auth/dto/clerkuser.dto';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) { }

  @Post(':videoId')
  async recordView(@Param('videoId') videoId: string, @User() user: ClerkUserDTO) {
    const view = await this.viewsService.create(user.sub, videoId);

    if (!view) {
      throw new HttpException(
        'View already recorded.',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      success: true,
      message: 'View recorded successfully'
    };
  }
}
