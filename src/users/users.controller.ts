import {
  Controller,
  Get,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUsers(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return this.usersService.getUserById(req.user.id);
  }

  @Patch('me')
  updateUser() {
    return { msg: 'This is the current user update route' };
  }

  @Patch('change-password')
  changePassword() {
    return { msg: 'This is the current user change password route' };
  }
}
