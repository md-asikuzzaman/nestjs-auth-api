import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/users/dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Register a new user */
  @ApiBearerAuth()
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /** Login a user */
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user and return access and refresh tokens',
  })
  @ApiOkResponse({
    description: 'User successfully logged in',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /** Logout a user */
  @ApiOperation({
    summary: 'Logout user',
    description: 'Invalidate user session and remove tokens',
  })
  @ApiBearerAuth()
  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }

  /** Refresh access and refresh tokens */
  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Generate new access and refresh tokens',
  })
  @ApiBearerAuth()
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  /** Admin-only route */
  @ApiTags('Admin only')
  @Roles('ADMIN')
  @Post('admin-only')
  adminRoute() {
    return { message: 'Welcome to the admin panel' };
  }
}
