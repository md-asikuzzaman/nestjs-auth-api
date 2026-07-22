import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Message } from 'src/common/decorators/message.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/users/dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh')) // Uses refresh token strategy instead of standard access JWT
  @Post('refresh')
  refreshTokens(@Req() req) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  @Roles('ADMIN')
  @Post('admin-only')
  adminRoute() {
    return { message: 'Welcome to the admin panel' };
  }
}
