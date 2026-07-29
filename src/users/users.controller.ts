import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ChangePasswordDto, UpdateUserDto } from './dto/user.dto';
import {
  ChangePasswordDocs,
  GetMeDocs,
  UpdateMeDocs,
} from './swagger/user.docs';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Get the current user profile */
  @GetMeDocs()
  @Get('me')
  getMe(@CurrentUser('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  /** Update the current user profile */
  @UpdateMeDocs()
  @ResponseMessage('User profile updated successfully.')
  @Patch('me')
  updateMe(@CurrentUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(userId, dto);
  }

  /** Change the current user password */
  @ChangePasswordDocs()
  @ResponseMessage('Password changed successfully.')
  @Patch('change-password')
  changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }
}
