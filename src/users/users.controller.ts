import {
  Controller,
  Get,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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

  @Public()
  @Get('profile')
  getProfile() {
    return { msg: 'This is the current user profile route' };
  }
}
