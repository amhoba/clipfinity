import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClerkUserDTO } from './dto/clerkuser.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ClerkUserDTO => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    return user;
  },
);