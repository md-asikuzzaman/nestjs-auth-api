import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from './users.service';

@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private userService: UsersService) {}

  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Patch('users/:id/block')
  blockUser(@Param('id', ParseIntPipe) id: string) {
    return this.userService.blockUser(id);
  }

  @Patch('users/:id/unblock')
  unblockUser(@Param('id', ParseIntPipe) id: string) {
    return this.userService.unblockUser(id);
  }
}
