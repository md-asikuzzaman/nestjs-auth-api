import { Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUsers() {
    return this.usersService.getUser();
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
