import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AdminController } from './admin.controller';

@Module({
  controllers: [UsersController, AdminController],
  providers: [UsersService],
})
export class UsersModule {}
