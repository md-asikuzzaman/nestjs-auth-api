import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ChangePasswordDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Returns the authenticated user profile.',
  })
  @ApiOkResponse({
    description: 'User profile retrieved successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Missing or invalid access token.',
  })
  getUsers(@CurrentUser('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch('me')
  updateUser(@CurrentUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(userId, dto);
  }

  @Patch('change-password')
  async changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return await this.usersService.changePassword(userId, dto);
  }
}
