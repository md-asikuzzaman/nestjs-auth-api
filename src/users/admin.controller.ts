import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor() {}

  @Get('users')
  getUsers() {
    return { msg: 'This is the admin users route' };
  }

  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    return { msg: `This is the admin user by ID route: ${id}` };
  }

  @Patch('users/:id/block')
  blockUser(@Param('id', ParseIntPipe) id: string) {
    return { msg: `This is the admin block user route: ${id}` };
  }

  @Patch('users/:id/unblock')
  unblockUser(@Param('id', ParseIntPipe) id: string) {
    return { msg: `This is the admin unblock user route: ${id}` };
  }
}
